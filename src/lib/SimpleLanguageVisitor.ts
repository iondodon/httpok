// Generated from SimpleLanguage.g4 by ANTLR 4.13.1

import {ParseTreeVisitor} from 'antlr4';


import { ProgramContext } from "./SimpleLanguageParser";
import { StatementContext } from "./SimpleLanguageParser";
import { PrintStatementContext } from "./SimpleLanguageParser";
import { ExpressionContext } from "./SimpleLanguageParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `SimpleLanguageParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class SimpleLanguageVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `SimpleLanguageParser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => Result;
	/**
	 * Visit a parse tree produced by `SimpleLanguageParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => Result;
	/**
	 * Visit a parse tree produced by `SimpleLanguageParser.printStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrintStatement?: (ctx: PrintStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `SimpleLanguageParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;
}

