// Generated from SimpleLanguage.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import SimpleLanguageListener from "./SimpleLanguageListener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class SimpleLanguageParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly STRING = 3;
	public static readonly WS = 4;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_program = 0;
	public static readonly RULE_statement = 1;
	public static readonly RULE_printStatement = 2;
	public static readonly RULE_expression = 3;
	public static readonly literalNames: (string | null)[] = [ null, "'print'", 
                                                            "';'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, "STRING", 
                                                             "WS" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "statement", "printStatement", "expression",
	];
	public get grammarFileName(): string { return "SimpleLanguage.g4"; }
	public get literalNames(): (string | null)[] { return SimpleLanguageParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return SimpleLanguageParser.symbolicNames; }
	public get ruleNames(): string[] { return SimpleLanguageParser.ruleNames; }
	public get serializedATN(): number[] { return SimpleLanguageParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, SimpleLanguageParser._ATN, SimpleLanguageParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let localctx: ProgramContext = new ProgramContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, SimpleLanguageParser.RULE_program);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 11;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===1) {
				{
				{
				this.state = 8;
				this.statement();
				}
				}
				this.state = 13;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 14;
			this.match(SimpleLanguageParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let localctx: StatementContext = new StatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, SimpleLanguageParser.RULE_statement);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 16;
			this.printStatement();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public printStatement(): PrintStatementContext {
		let localctx: PrintStatementContext = new PrintStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, SimpleLanguageParser.RULE_printStatement);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 18;
			this.match(SimpleLanguageParser.T__0);
			this.state = 19;
			this.expression();
			this.state = 20;
			this.match(SimpleLanguageParser.T__1);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public expression(): ExpressionContext {
		let localctx: ExpressionContext = new ExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, SimpleLanguageParser.RULE_expression);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 22;
			this.match(SimpleLanguageParser.STRING);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public static readonly _serializedATN: number[] = [4,1,4,25,2,0,7,0,2,1,
	7,1,2,2,7,2,2,3,7,3,1,0,5,0,10,8,0,10,0,12,0,13,9,0,1,0,1,0,1,1,1,1,1,2,
	1,2,1,2,1,2,1,3,1,3,1,3,0,0,4,0,2,4,6,0,0,21,0,11,1,0,0,0,2,16,1,0,0,0,
	4,18,1,0,0,0,6,22,1,0,0,0,8,10,3,2,1,0,9,8,1,0,0,0,10,13,1,0,0,0,11,9,1,
	0,0,0,11,12,1,0,0,0,12,14,1,0,0,0,13,11,1,0,0,0,14,15,5,0,0,1,15,1,1,0,
	0,0,16,17,3,4,2,0,17,3,1,0,0,0,18,19,5,1,0,0,19,20,3,6,3,0,20,21,5,2,0,
	0,21,5,1,0,0,0,22,23,5,3,0,0,23,7,1,0,0,0,1,11];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!SimpleLanguageParser.__ATN) {
			SimpleLanguageParser.__ATN = new ATNDeserializer().deserialize(SimpleLanguageParser._serializedATN);
		}

		return SimpleLanguageParser.__ATN;
	}


	static DecisionsToDFA = SimpleLanguageParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class ProgramContext extends ParserRuleContext {
	constructor(parser?: SimpleLanguageParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EOF(): TerminalNode {
		return this.getToken(SimpleLanguageParser.EOF, 0);
	}
	public statement_list(): StatementContext[] {
		return this.getTypedRuleContexts(StatementContext) as StatementContext[];
	}
	public statement(i: number): StatementContext {
		return this.getTypedRuleContext(StatementContext, i) as StatementContext;
	}
    public get ruleIndex(): number {
    	return SimpleLanguageParser.RULE_program;
	}
	public enterRule(listener: SimpleLanguageListener): void {
	    if(listener.enterProgram) {
	 		listener.enterProgram(this);
		}
	}
	public exitRule(listener: SimpleLanguageListener): void {
	    if(listener.exitProgram) {
	 		listener.exitProgram(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	constructor(parser?: SimpleLanguageParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public printStatement(): PrintStatementContext {
		return this.getTypedRuleContext(PrintStatementContext, 0) as PrintStatementContext;
	}
    public get ruleIndex(): number {
    	return SimpleLanguageParser.RULE_statement;
	}
	public enterRule(listener: SimpleLanguageListener): void {
	    if(listener.enterStatement) {
	 		listener.enterStatement(this);
		}
	}
	public exitRule(listener: SimpleLanguageListener): void {
	    if(listener.exitStatement) {
	 		listener.exitStatement(this);
		}
	}
}


export class PrintStatementContext extends ParserRuleContext {
	constructor(parser?: SimpleLanguageParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return SimpleLanguageParser.RULE_printStatement;
	}
	public enterRule(listener: SimpleLanguageListener): void {
	    if(listener.enterPrintStatement) {
	 		listener.enterPrintStatement(this);
		}
	}
	public exitRule(listener: SimpleLanguageListener): void {
	    if(listener.exitPrintStatement) {
	 		listener.exitPrintStatement(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	constructor(parser?: SimpleLanguageParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STRING(): TerminalNode {
		return this.getToken(SimpleLanguageParser.STRING, 0);
	}
    public get ruleIndex(): number {
    	return SimpleLanguageParser.RULE_expression;
	}
	public enterRule(listener: SimpleLanguageListener): void {
	    if(listener.enterExpression) {
	 		listener.enterExpression(this);
		}
	}
	public exitRule(listener: SimpleLanguageListener): void {
	    if(listener.exitExpression) {
	 		listener.exitExpression(this);
		}
	}
}
