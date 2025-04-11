import SimpleLanguageVisitor from "./SimpleLanguageVisitor";
import {
  ProgramContext,
  PrintStatementContext,
  ExpressionContext,
} from "./SimpleLanguageParser";

export class ExecuteVisitor extends SimpleLanguageVisitor<void> {
  output: string[] = [];

  visitProgram = (ctx: ProgramContext): void => {
    for (const stmt of ctx.statement_list?.() || []) {
      this.visit(stmt);
    }
  };

  visitPrintStatement = (ctx: PrintStatementContext): void => {
    const expr = ctx.expression();
    const value = this.visit(expr);
    if (typeof value === "string") {
      this.output.push(value);
    }
  };

  visitExpression = (ctx: ExpressionContext): string => {
    const raw = ctx.STRING().getText(); // e.g. "\"Hello\""
    return raw.slice(1, -1); // remove quotes
  };
}
