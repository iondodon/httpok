import * as monaco from "monaco-editor";

export function registerMyLanguage() {
  monaco.languages.register({ id: "myLanguage" });

  monaco.languages.setMonarchTokensProvider("myLanguage", {
    tokenizer: {
      root: [
        [/\bGET\b/, "keyword"],
        [/\bhttps?:\/\/[^\s]+/, "constant"],

        // Headers
        [/^[A-Za-z0-9\-]+(?=\s*:)/, "type.identifier"],
        [/:\s*/, "delimiter"],
        [/[^:\r\n]+$/, "string"],

        [/[ \t\r\n]+/, "white"],
      ],
    },
  });

  monaco.languages.setLanguageConfiguration("myLanguage", {
    autoClosingPairs: [],
    surroundingPairs: [],
    comments: {},
  });
}
