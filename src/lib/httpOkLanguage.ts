import * as monaco from "monaco-editor";

export function registerHttpOkLanguage() {
  monaco.languages.register({ id: "httpok" });

  monaco.languages.setMonarchTokensProvider("httpok", {
    tokenizer: {
      root: [
        [/^#.*$/, "comment"],
  
        // HTTP methods (styled like headers)
        [/\b(GET|POST|PUT|DELETE|PATCH|OPTIONS|HEAD)\b/, "type.identifier"],
  
        // URLs
        [/\bhttps?:\/\/[^\s]+/, "constant"],
  
        // Headers
        [/^[A-Za-z0-9\-]+(?=\s*:)/, "type.identifier"],
        [/:\s*/, "delimiter"],
        [/[^:\r\n]+$/, "string"],
  
        // Body lines starting with |
        [/^\|.*/, "string.body"],
  
        // Whitespace
        [/[ \t\r\n]+/, "white"],
      ],
    },
  });
  

  monaco.languages.setLanguageConfiguration("httpok", {
    comments: {
      lineComment: "#",
    },
    autoClosingPairs: [],
    surroundingPairs: [],
  });
}
