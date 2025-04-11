<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import * as monaco from "monaco-editor";
  import loader from "@monaco-editor/loader";
  import { registerMyLanguage } from "../lib/myLanguage";
  import { SimpleLanguageService } from "../lib/SimpleLanguageService";

  let editorContainer: HTMLElement;
  let outputEditorContainer: HTMLElement;
  let editor: monaco.editor.IStandaloneCodeEditor;
  let outputEditor: monaco.editor.IStandaloneCodeEditor;

  const defaultText = `GET https://jsonplaceholder.typicode.com/posts/1
Accept: application/json
Authorization: Bearer test123`;

  let text = defaultText;
  let output: string[] = [];

  const languageService = new SimpleLanguageService();

  onMount(async () => {
    try {
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
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: "on",
        padding: { top: 10, bottom: 10 },
      });

      outputEditor = monaco.editor.create(outputEditorContainer, {
        value: "",
        language: "plaintext",
        readOnly: true,
        theme: "vs-dark",
        automaticLayout: true,
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: "on",
        padding: { top: 10, bottom: 10 },
      });

      editor.onDidChangeModelContent(() => {
        text = editor.getValue();
      });

      requestAnimationFrame(() => {
        editor.layout();
        outputEditor.layout();
      });
    } catch (err) {
      console.error("Editor init error:", err);
    }
  });

  onDestroy(() => {
    editor?.dispose();
    outputEditor?.dispose();
  });

  let loading = false;

  async function logInput(event: Event) {
    event.preventDefault();
    loading = true;
    try {
      output = await languageService.execute(text);
      const outputText = output.join("\n");
      outputEditor.setValue(outputText);
    } catch (error) {
      console.error("Error executing code:", error);
    } finally {
      loading = false;
    }
  }
</script>

<main>
  <form on:submit={logInput}>
    <div class="editor-wrapper">
      <div class="editor-container" bind:this={editorContainer}></div>

      <div class="editor-container output-editor-wrapper">
        <div class="loading-overlay" class:visible={loading}>
          ⏳ Executing request...
        </div>
        <div bind:this={outputEditorContainer} class="output-editor"></div>
      </div>
    </div>

    <button type="submit">Execute</button>
  </form>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5vh;
  }

  form {
    width: 95%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .editor-wrapper {
    display: flex;
    gap: 1rem;
    width: 100%;
  }

  .output-editor-wrapper {
    position: relative;
  }

  .output-editor {
    width: 100%;
    height: 100%;
  }

  .loading-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    font-size: 1.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    border-radius: 8px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  .loading-overlay.visible {
    opacity: 1;
    pointer-events: all;
  }

  .editor-container {
    flex: 1;
    height: 400px;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
  }

  button {
    align-self: flex-end;
    padding: 0.6em 1.2em;
    font-size: 1rem;
    border: none;
    border-radius: 6px;
    background: #444;
    color: #fff;
    cursor: pointer;
  }

  button:hover {
    background-color: #555;
  }

  @media (prefers-color-scheme: dark) {
    .editor-container {
      border-color: #333;
    }

    button {
      background-color: #222;
    }

    button:hover {
      background-color: #333;
    }
  }
</style>
