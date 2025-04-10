import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import type { SimpleLanguageVisitor } from './SimpleLanguageVisitor';
import type { ProgramContext, StatementContext, PrintStatementContext, ExpressionContext } from './SimpleLanguageParser';

export class SimpleLanguageExecutor extends AbstractParseTreeVisitor<void> implements SimpleLanguageVisitor<void> {
    private output: string[] = [];

    execute(tree: ProgramContext): void {
        this.visit(tree);
    }

    visitProgram(ctx: ProgramContext): void {
        ctx.statement().forEach(stmt => this.visit(stmt));
    }

    visitStatement(ctx: StatementContext): void {
        this.visit(ctx.printStatement());
    }

    visitPrintStatement(ctx: PrintStatementContext): void {
        this.visit(ctx.expression());
    }

    visitExpression(ctx: ExpressionContext): void {
        const stringToken = ctx.STRING();
        if (stringToken) {
            const text = stringToken.text;
            this.output.push(text.slice(1, -1));
        }
    }

    getOutput(): string[] {
        return this.output;
    }

    protected defaultResult(): void {}
} 