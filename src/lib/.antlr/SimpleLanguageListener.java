// Generated from /home/ion/httpok/src/lib/SimpleLanguage.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link SimpleLanguageParser}.
 */
public interface SimpleLanguageListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link SimpleLanguageParser#program}.
	 * @param ctx the parse tree
	 */
	void enterProgram(SimpleLanguageParser.ProgramContext ctx);
	/**
	 * Exit a parse tree produced by {@link SimpleLanguageParser#program}.
	 * @param ctx the parse tree
	 */
	void exitProgram(SimpleLanguageParser.ProgramContext ctx);
	/**
	 * Enter a parse tree produced by {@link SimpleLanguageParser#statement}.
	 * @param ctx the parse tree
	 */
	void enterStatement(SimpleLanguageParser.StatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link SimpleLanguageParser#statement}.
	 * @param ctx the parse tree
	 */
	void exitStatement(SimpleLanguageParser.StatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link SimpleLanguageParser#printStatement}.
	 * @param ctx the parse tree
	 */
	void enterPrintStatement(SimpleLanguageParser.PrintStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link SimpleLanguageParser#printStatement}.
	 * @param ctx the parse tree
	 */
	void exitPrintStatement(SimpleLanguageParser.PrintStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link SimpleLanguageParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterExpression(SimpleLanguageParser.ExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link SimpleLanguageParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitExpression(SimpleLanguageParser.ExpressionContext ctx);
}