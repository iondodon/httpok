import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import monaco from "vite-plugin-monaco-editor";

// Support both ESM and CJS
// @ts-ignore
const monacoPlugin = monaco.default || monaco;

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

export default defineConfig(() => ({
  plugins: [
    sveltekit(),
    monacoPlugin({
      // 👇 You must include this for core editor functionality
      languageWorkers: ["editorWorkerService", "json"],
    }),
  ],
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
}));
