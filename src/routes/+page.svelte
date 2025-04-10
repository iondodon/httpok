<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import * as monaco from "monaco-editor";
  import loader from "@monaco-editor/loader";
  import { registerMyLanguage } from "../lib/myLanguage";
  import { SimpleLanguageService } from "../lib/SimpleLanguageService";

  let editorContainer: HTMLElement;
  let editor: monaco.editor.IStandaloneCodeEditor;
  const defaultText = `print Hello World
  print This is a simple language
  print Each line starts with print`;
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
        padding: { top: 10, bottom: 10 },
        scrollBeyondLastLine: false,
        wordWrap: "on",
      });

      editor.onDidChangeModelContent(() => {
        text = editor.getValue();
      });

      requestAnimationFrame(() => editor.layout());
    } catch (err) {
      console.error("Editor init error:", err);
    }
  });

  onDestroy(() => {
    editor?.dispose();
  });

  function logInput(event: Event) {
    event.preventDefault();
    try {
      output = languageService.execute(text);
      console.log("Execution output:", output);
    } catch (error) {
      console.error("Error executing code:", error);
    }
  }
</script>

<main>
  <form on:submit={logInput}>
    <div class="editor-container" bind:this={editorContainer}></div>
    <button type="submit">Execute</button>
  </form>
  {#if output.length > 0}
    <div class="output">
      {#each output as line}
        <div>{line}</div>
      {/each}
    </div>
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5vh;
  }

  form {
    width: 90%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .editor-container {
    width: 100%;
    height: 400px;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
  }

  .output {
    margin-top: 1rem;
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 8px;
    width: 90%;
    max-width: 800px;
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

    .output {
      background: #333;
      color: #fff;
    }

    button {
      background-color: #222;
    }

    button:hover {
      background-color: #333;
    }
  }
</style>
