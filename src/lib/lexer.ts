import { createToken, Lexer } from "chevrotain";

export const Comment = createToken({
  name: "Comment",
  pattern: /#[^\n\r]*/,
  line_breaks: false,
});

export const Method = createToken({
  name: "Method",
  pattern: /GET|POST|PUT|DELETE|PATCH|OPTIONS|HEAD/,
});

export const Url = createToken({
  name: "Url",
  pattern: /https?:\/\/[^\s]+/,
});

export const BodyDelimiter = createToken({
  name: "BodyDelimiter",
  pattern: /---/,
});

export const BodyLine = createToken({
  name: "BodyLine",
  pattern: /[^\n\r]+/,
  line_breaks: false,
});

export const Header = createToken({
  name: "Header",
  pattern: /[A-Za-z0-9\-]+:\s*[^\n\r]+/,
  line_breaks: false,
});

export const Newline = createToken({
  name: "Newline",
  pattern: /\r?\n/,
  line_breaks: true,
});

export const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /[ \t]+/,
  group: Lexer.SKIPPED,
});

export const allTokens = [
  WhiteSpace,
  Comment,
  Method,
  Url,
  BodyDelimiter,
  Header,
  BodyLine,
  Newline
];

export const SimpleLexer = new Lexer(allTokens);

