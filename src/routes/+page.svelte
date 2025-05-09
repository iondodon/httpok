<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import * as monaco from "monaco-editor";
  import { registerHttpOkLanguage } from "../lib/httpOkLanguage";
  import { HttpOkLanguageService } from "../lib/httpOkLanguageService";
  import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
  import JsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
  import { listen } from "@tauri-apps/api/event";
  import { invoke } from "@tauri-apps/api/core";

  // This must be before using monaco
  // Must be global before any monaco.editor.create
  // @ts-ignore
  self.MonacoEnvironment = {
    getWorker(_: any, label: string) {
      if (label === "json") return new JsonWorker();
      return new EditorWorker(); // for everything else (custom languages too)
    },
  };

  let editorContainer: HTMLElement;
  let outputEditorContainer: HTMLElement;
  let resizableContainer: HTMLDivElement;

  let editor: monaco.editor.IStandaloneCodeEditor;
  let outputEditor: monaco.editor.IStandaloneCodeEditor;

  // Track zoom levels
  let editorZoomLevel = 14;
  let outputEditorZoomLevel = 14;

  // Function to adjust zoom level
  function adjustZoom(
    editor: monaco.editor.IStandaloneCodeEditor,
    currentLevel: number,
    delta: number
  ): number {
    const newSize = Math.max(8, Math.min(30, currentLevel + delta));
    editor.updateOptions({ fontSize: newSize });
    return newSize;
  }

  // Handle zoom for input editor
  function handleInputEditorWheel(event: WheelEvent) {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
      event.stopPropagation();
      const delta = event.deltaY > 0 ? -1 : 1;
      editorZoomLevel = adjustZoom(editor, editorZoomLevel, delta);
    }
  }

  // Handle zoom for output editor
  function handleOutputEditorWheel(event: WheelEvent) {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
      event.stopPropagation();
      const delta = event.deltaY > 0 ? -1 : 1;
      outputEditorZoomLevel = adjustZoom(
        outputEditor,
        outputEditorZoomLevel,
        delta
      );
    }
  }

  // Handle keyboard shortcuts
  function handleKeyboard(event: KeyboardEvent) {
    if (event.ctrlKey || event.metaKey) {
      const target = event.target as HTMLElement;
      const isInputEditor = editor?.getDomNode()?.contains(target);
      const isOutputEditor = outputEditor?.getDomNode()?.contains(target);

      if (isInputEditor || isOutputEditor) {
        const currentEditor = isInputEditor ? editor : outputEditor;
        const currentZoomLevel = isInputEditor
          ? editorZoomLevel
          : outputEditorZoomLevel;

        if (event.key === "=" || (event.key === "+" && event.shiftKey)) {
          event.preventDefault();
          if (isInputEditor) {
            editorZoomLevel = adjustZoom(currentEditor, currentZoomLevel, 1);
          } else {
            outputEditorZoomLevel = adjustZoom(
              currentEditor,
              currentZoomLevel,
              1
            );
          }
        } else if (event.key === "-") {
          event.preventDefault();
          if (isInputEditor) {
            editorZoomLevel = adjustZoom(currentEditor, currentZoomLevel, -1);
          } else {
            outputEditorZoomLevel = adjustZoom(
              currentEditor,
              currentZoomLevel,
              -1
            );
          }
        }
      }
    }
  }

  const languageService = new HttpOkLanguageService();
  const defaultText = `
# httok https://github.com/iondodon/httpok licensed under GPLv3
#
# Comments are allowed after the before the first request, between requests, and after the last request.
# Empty lines are not allowed between headers or between the URL line and the first defined header.
# Empty lines are allowed between the last defined header of a request and its body.
# Lines defining the request body should start with a '|'.
#
# Examples:
# GET https://jsonplaceholder.typicode.com/posts/1
# Accept: application/json
# Authorization: Bearer test123
#
# POST https://jsonplaceholder.typicode.com/posts
# Content-Type: application/json
# |{
# |  "title": "foo",
# |  "body": "bar",
# |  "userId": 1
# |}
#
# Highlight the request or requests you want to execute, then click Execute.
# If nothing is highlighted, all requests will be executed one after another.

GET https://jsonplaceholder.typicode.com/posts/1
Accept: application/json
Authorization: Bearer test123

POST https://jsonplaceholder.typicode.com/posts
Content-Type: application/json
|{
|  "title": "foo",
|  "body": "bar",
|  "userId": 1
|}
  `;

  let loading = false;

  onMount(async () => {
    registerHttpOkLanguage();

    // Create separate editor instances with their own configurations
    const commonEditorOptions = {
      theme: "vs-dark",
      automaticLayout: true,
      fontSize: 14,
      wordWrap: "on" as const,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      padding: { top: 10, bottom: 10 },
      mouseWheelZoom: false,
      links: false, // Disable URL underlines
    };

    editor = monaco.editor.create(editorContainer, {
      ...commonEditorOptions,
      value: defaultText,
      language: "httpok",
    });

    outputEditor = monaco.editor.create(outputEditorContainer, {
      ...commonEditorOptions,
      value: "",
      language: "json",
      readOnly: true,
    });

    // Add zoom handlers to the editor viewports
    const inputViewportContainer = editor
      .getDomNode()
      ?.querySelector(".monaco-scrollable-element") as HTMLElement;
    if (inputViewportContainer) {
      inputViewportContainer.addEventListener("wheel", handleInputEditorWheel, {
        passive: false,
      });
    }

    const outputViewportContainer = outputEditor
      .getDomNode()
      ?.querySelector(".monaco-scrollable-element") as HTMLElement;
    if (outputViewportContainer) {
      outputViewportContainer.addEventListener(
        "wheel",
        handleOutputEditorWheel,
        { passive: false }
      );
    }

    // Add keyboard event listener
    document.addEventListener("keydown", handleKeyboard);

    // Reset zoom with Ctrl/Cmd + 0
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Digit0, () => {
      editor.updateOptions({ fontSize: 14 });
      editorZoomLevel = 14;
    });

    outputEditor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.Digit0,
      () => {
        outputEditor.updateOptions({ fontSize: 14 });
        outputEditorZoomLevel = 14;
      }
    );

    // Layout them once after mount
    requestAnimationFrame(() => {
      editor.layout();
      outputEditor.layout();
    });

    listen("menu-save", async () => {
      const content = editor.getValue();
      await invoke("save_with_dialog", { content });
    });

    listen("file-opened", (event) => {
      const content = event.payload as string;
      editor.setValue(content);
    });
  });

  onDestroy(() => {
    const inputViewportContainer = editor
      ?.getDomNode()
      ?.querySelector(".monaco-scrollable-element") as HTMLElement;
    const outputViewportContainer = outputEditor
      ?.getDomNode()
      ?.querySelector(".monaco-scrollable-element") as HTMLElement;

    inputViewportContainer?.removeEventListener(
      "wheel",
      handleInputEditorWheel
    );
    outputViewportContainer?.removeEventListener(
      "wheel",
      handleOutputEditorWheel
    );
    document.removeEventListener("keydown", handleKeyboard);

    editor?.dispose();
    outputEditor?.dispose();
  });

  async function runRequests(event: Event) {
    event.preventDefault();
    loading = true;

    try {
      const selection = editor.getSelection();
      const model = editor.getModel();
      const selected =
        selection && model ? model.getValueInRange(selection).trim() : "";

      const code = selected || editor.getValue();
      const responses = await languageService.execute(code);

      outputEditor.setValue(JSON.stringify(responses, null, 2));
    } catch (err) {
      outputEditor.setValue(`❌ Error:\n${err}`);
      console.error(err);
    } finally {
      loading = false;
    }
  }

  // Resize logic
  let isDragging = false;

  function onMouseDown(event: MouseEvent) {
    isDragging = true;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.body.style.cursor = "ew-resize";
  }

  function onMouseMove(event: MouseEvent) {
    if (!isDragging || !resizableContainer) return;

    const bounds = resizableContainer.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left;
    const totalWidth = bounds.width;

    // Prevent shrinking too much
    if (offsetX < 100 || offsetX > totalWidth - 100) return;

    const leftWidth = offsetX;
    const rightWidth = totalWidth - offsetX - 6; // 6 is handle width

    const left = resizableContainer.querySelector(
      ".left-pane"
    ) as HTMLDivElement;
    const right = resizableContainer.querySelector(
      ".right-pane"
    ) as HTMLDivElement;

    const totalFlex = leftWidth + rightWidth;
    const leftFlex = leftWidth / totalFlex;
    const rightFlex = rightWidth / totalFlex;

    left.style.flex = `${leftFlex}`;
    right.style.flex = `${rightFlex}`;

    editor?.layout();
    outputEditor?.layout();
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    document.body.style.cursor = "";
  }
</script>

<main>
  <div class="resizable" bind:this={resizableContainer}>
    <div class="left-pane" bind:this={editorContainer}></div>
    <div class="drag-handle" on:mousedown={onMouseDown}></div>
    <div class="right-pane" bind:this={outputEditorContainer}></div>
  </div>

  <div class="actions">
    <button on:click={runRequests} disabled={loading}>
      {#if loading}
        ⏳ Executing...
      {:else}
        ▶ Execute
      {/if}
    </button>
  </div>
</main>

<style>
  main {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
  }

  .resizable {
    flex: 1; /* take all vertical space above button */
    display: flex;
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .left-pane,
  .right-pane {
    height: 100%;
    flex: 1; /* base fallback */
    overflow: hidden;
  }

  .drag-handle {
    width: 6px;
    background: #888;
    cursor: ew-resize;
    z-index: 10;
  }

  .drag-handle:hover {
    background: #aaa;
  }

  .actions {
    height: 60px;
    width: 100%;
    padding: 0;
    margin: 0;
    border-top: 1px solid #333;
  }

  .actions button {
    width: 100%;
    height: 100%;
    font-size: 1.2rem;
    background: #444;
    color: white;
    border: none;
    border-radius: 0;
    cursor: pointer;
  }

  .actions button:hover:enabled {
    background: #555;
  }

  .actions button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  button:hover:enabled {
    background: #555;
  }

  @media (prefers-color-scheme: dark) {
    .actions {
      background-color: #111;
    }

    .drag-handle {
      background-color: #444;
    }

    .drag-handle:hover {
      background-color: #777;
    }
  }
</style>
