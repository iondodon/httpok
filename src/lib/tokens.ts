import { createToken, Lexer } from "chevrotain";

// Define all tokens
export const Print = createToken({ name: "Print", pattern: /print/ });
export const StringLiteral = createToken({
  name: "StringLiteral",
  pattern: /"[^"]*"/,
});
export const Semicolon = createToken({ name: "Semicolon", pattern: /;/ });
export const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED,
});

// Token order matters: longer matches or keywords first
export const allTokens = [WhiteSpace, Print, StringLiteral, Semicolon];
export const SimpleLexer = new Lexer(allTokens);
