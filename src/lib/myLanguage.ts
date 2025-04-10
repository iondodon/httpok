import * as monaco from 'monaco-editor';

export function registerMyLanguage() {
    // Register a new language
    monaco.languages.register({ id: 'myLanguage' });

    // Register a tokens provider for the language
    monaco.languages.setMonarchTokensProvider('myLanguage', {
        tokenizer: {
            root: [
                // Keywords
                [/\bprint\b/, "keyword"],
                
                // Strings (anything between double quotes)
                [/".*?"/, "string"],
                
                // Semicolon
                [/;/, "delimiter"],
                
                // Whitespace
                [/[ \t\r\n]+/, "white"],
            ]
        }
    });

    // Define the language configuration
    monaco.languages.setLanguageConfiguration('myLanguage', {
        brackets: [],
        autoClosingPairs: [
            { open: '"', close: '"' }
        ],
        surroundingPairs: [
            { open: '"', close: '"' }
        ],
        comments: {},
    });
} 