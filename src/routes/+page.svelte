<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import * as monaco from "monaco-editor";
  import loader from "@monaco-editor/loader";
  import { registerMyLanguage } from "../lib/myLanguage";
  import { SimpleLanguageService } from "../lib/SimpleLanguageService";

  let editorContainer: HTMLElement;
  let outputEditorContainer: HTMLElement;
  let resizableContainer: HTMLDivElement;

  let editor: monaco.editor.IStandaloneCodeEditor;
  let outputEditor: monaco.editor.IStandaloneCodeEditor;

  const languageService = new SimpleLanguageService();
  const defaultText = `GET https://jsonplaceholder.typicode.com/posts/1
Accept: application/json
Authorization: Bearer test123`;

  let loading = false;

  onMount(async () => {
    loader.config({
      paths: {
        vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs",
      },
    });

    await loader.init();
    registerMyLanguage();

    editor = monaco.editor.create(editorContainer, {
      value: defaultText,
      language: "myLanguage",
      theme: "vs-dark",
      automaticLayout: true,
      fontSize: 14,
      wordWrap: "on",
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      padding: { top: 10, bottom: 10 },
    });

    outputEditor = monaco.editor.create(outputEditorContainer, {
      value: "",
      language: "plaintext",
      readOnly: true,
      theme: "vs-dark",
      automaticLayout: true,
      fontSize: 14,
      wordWrap: "on",
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      padding: { top: 10, bottom: 10 },
    });

    // Layout them once after mount
    requestAnimationFrame(() => {
      editor.layout();
      outputEditor.layout();
    });
  });

  onDestroy(() => {
    editor?.dispose();
    outputEditor?.dispose();
  });

  async function logInput(event: Event) {
    event.preventDefault();
    loading = true;

    try {
      const selection = editor.getSelection();
      const model = editor.getModel();
      const selected =
        selection && model ? model.getValueInRange(selection).trim() : "";

      const toExecute = selected || editor.getValue().trim();
      const result = await languageService.execute(toExecute);
      outputEditor.setValue(result.join("\n"));
    } catch (err) {
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

    left.style.width = `${leftWidth}px`;
    right.style.width = `${rightWidth}px`;

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
  <form on:submit={logInput}>
    <div class="resizable" bind:this={resizableContainer}>
      <div class="left-pane" bind:this={editorContainer}></div>
      <div class="drag-handle" on:mousedown={onMouseDown}></div>
      <div class="right-pane" bind:this={outputEditorContainer}></div>
    </div>

    <div class="actions">
      <button type="submit" disabled={loading}>
        {#if loading}
          ⏳ Executing...
        {:else}
          ▶ Execute
        {/if}
      </button>
    </div>
  </form>
</main>

<style>
  main {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  form {
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .resizable {
    display: flex;
    width: 100%;
    height: 400px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
  }

  .left-pane,
  .right-pane {
    height: 100%;
    width: 50%;
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
    display: flex;
    justify-content: flex-end;
  }

  button {
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
    background: #444;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  button:hover:enabled {
    background: #555;
  }

  @media (prefers-color-scheme: dark) {
    .drag-handle {
      background-color: #444;
    }

    .drag-handle:hover {
      background-color: #777;
    }
  }
</style>
