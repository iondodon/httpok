// Generated from src/lib/SimpleLanguage.g4 by ANTLR 4.9.0-SNAPSHOT


import type { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import type { ProgramContext } from "./SimpleLanguageParser";
import type { StatementContext } from "./SimpleLanguageParser";
import type { PrintStatementContext } from "./SimpleLanguageParser";
import type { ExpressionContext } from "./SimpleLanguageParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `SimpleLanguageParser`.
 */
export interface SimpleLanguageListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `SimpleLanguageParser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleLanguageParser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleLanguageParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleLanguageParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleLanguageParser.printStatement`.
	 * @param ctx the parse tree
	 */
	enterPrintStatement?: (ctx: PrintStatementContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleLanguageParser.printStatement`.
	 * @param ctx the parse tree
	 */
	exitPrintStatement?: (ctx: PrintStatementContext) => void;

	/**
	 * Enter a parse tree produced by `SimpleLanguageParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `SimpleLanguageParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;
}

