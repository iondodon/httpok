// Generated from src/lib/SimpleLanguage.g4 by ANTLR 4.9.0-SNAPSHOT


import type { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { ProgramContext } from "./SimpleLanguageParser";
import { StatementContext } from "./SimpleLanguageParser";
import { PrintStatementContext } from "./SimpleLanguageParser";
import { ExpressionContext } from "./SimpleLanguageParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `SimpleLanguageParser`.
 *
 * @param <r> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface SimpleLanguageVisitor<r> extends ParseTreeVisitor<r> {
	/**
	 * Visit a parse tree produced by `SimpleLanguageParser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => r;

	/**
	 * Visit a parse tree produced by `SimpleLanguageParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => r;

	/**
	 * Visit a parse tree produced by `SimpleLanguageParser.printStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrintStatement?: (ctx: PrintStatementContext) => r;

	/**
	 * Visit a parse tree produced by `SimpleLanguageParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => r;
}

