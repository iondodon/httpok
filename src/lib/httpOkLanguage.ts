import * as monaco from "monaco-editor";

export function registerHttpOkLanguage() {
  monaco.languages.register({ id: "httpok" });

  monaco.languages.setMonarchTokensProvider("httpok", {
    defaultToken: "",
    tokenPostfix: ".httpok",

    // JSON states and rules
    brackets: [
      { open: "{", close: "}", token: "delimiter.curly" },
      { open: "[", close: "]", token: "delimiter.square" },
      { open: "(", close: ")", token: "delimiter.parenthesis" }
    ],

    keywords: ["true", "false", "null"],

    // The main tokenizer for our languages
    tokenizer: {
      root: [
        // Comments
        [/^#.*$/, "comment"],

        // HTTP methods
        [/\b(GET|POST|PUT|DELETE|PATCH|OPTIONS|HEAD)\b/, "type.identifier"],

        // URLs
        [/\bhttps?:\/\/[^\s]+/, "constant"],

        // Headers
        [/^[A-Za-z0-9\-]+(?=\s*:)/, "type.identifier"],
        [/:\s*/, "delimiter"],
        [/[^:\r\n]+$/, "string"],

        // Body delimiter
        [/^---$/, { token: "delimiter.body", next: "@body" }],

        // Whitespace
        [/[ \t\r\n]+/, "white"],
      ],

      // JSON body state
      body: [
        // Exit body state on delimiter
        [/^---$/, { token: "delimiter.body", next: "@pop" }],

        // JSON string
        [/"([^"\\]|\\.)*$/, "string.invalid"],  // non-terminated string
        [/"/, { token: "string.quote", bracket: "@open", next: "@string" }],

        // JSON numbers
        [/[0-9]+\.[0-9]*([eE][\-+]?[0-9]+)?/, "number.float"],
        [/[0-9]+/, "number"],

        // JSON keywords
        [/\b(true|false|null)\b/, "keyword"],

        // JSON brackets
        [/[{}()\[\]]/, "@brackets"],

        // JSON object key
        [/[a-zA-Z_$][\w$]*/, "identifier"],

        // JSON operators
        [/[,:]/, "delimiter"],

        // Whitespace
        [/\s+/, "white"]
      ],

      // JSON string state
      string: [
        [/[^\\"]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }]
      ]
    },

    escapes: /\\(?:[bfnrtv\\"']|u[0-9A-Fa-f]{4})/,
  });

  monaco.languages.setLanguageConfiguration("httpok", {
    comments: {
      lineComment: "#",
    },
    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"]
    ],
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' }
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' }
    ]
  });
}
