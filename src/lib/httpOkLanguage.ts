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
    onEnterRules: [
      {
        // When pressing Enter in a line that starts with | (possibly with whitespace before it)
        beforeText: /^[\s]*\|.*$/,
        action: {
          indentAction: monaco.languages.IndentAction.None,
          appendText: '|'
        }
      }
    ],
    folding: {
      markers: {
        start: /^\|.*$/,
        end: /^(?!\|).*$/
      }
    }
  });
}
