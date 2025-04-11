import { createToken, Lexer } from "chevrotain";

// HTTP Method
export const Get = createToken({ name: "Get", pattern: /GET/ });

// Bare URL (without quotes)
export const Url = createToken({
  name: "Url",
  pattern: /https?:\/\/[^\s]+/,
});

// Headers (key: value)
export const Header = createToken({
  name: "Header",
  pattern: /[A-Za-z0-9\-]+:\s*[^\n\r]+/,
  line_breaks: false,
});

// Newlines
export const Newline = createToken({
  name: "Newline",
  pattern: /\r?\n/,
  line_breaks: true,
});

// Skipped whitespace
export const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /[ \t]+/,
  group: Lexer.SKIPPED,
});

export const allTokens = [WhiteSpace, Get, Url, Header, Newline];

export const SimpleLexer = new Lexer(allTokens);
