import type { CstNode } from "chevrotain";
import { SimpleParser } from "./parser";
import { allTokens, SimpleLexer } from "./tokens";

// Create parser and visitor
const parser = new SimpleParser();
const BaseVisitor = parser.getBaseCstVisitorConstructor();

class Interpreter extends BaseVisitor {
  output: string[] = [];

  constructor() {
    super();
    this.validateVisitor();
  }

  program(ctx: any) {
    ctx.printStatement?.forEach((stmt: CstNode) => this.visit(stmt));
  }

  printStatement(ctx: any) {
    const rawString = ctx.StringLiteral[0].image; // e.g., "\"hello\""
    this.output.push(rawString.slice(1, -1)); // strip quotes
  }
}

// Main runner function
export function execute(input: string): string[] {
  const lexResult = SimpleLexer.tokenize(input);

  if (lexResult.errors.length > 0) {
    throw new Error("Lexing error");
  }

  parser.input = lexResult.tokens;
  const cst = parser.program();

  if (parser.errors.length > 0) {
    throw new Error("Parsing error");
  }

  const interpreter = new Interpreter();
  interpreter.visit(cst);
  return interpreter.output;
}
