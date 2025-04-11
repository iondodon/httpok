// Generated from SimpleLanguage.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');
var SimpleLanguageListener = require('./SimpleLanguageListener').SimpleLanguageListener;
var grammarFileName = "SimpleLanguage.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u0006\u001b\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0003\u0002\u0007\u0002\f\n\u0002\f\u0002",
    "\u000e\u0002\u000f\u000b\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003",
    "\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0002\u0002\u0006\u0002\u0004\u0006\b\u0002\u0002",
    "\u0002\u0017\u0002\r\u0003\u0002\u0002\u0002\u0004\u0012\u0003\u0002",
    "\u0002\u0002\u0006\u0014\u0003\u0002\u0002\u0002\b\u0018\u0003\u0002",
    "\u0002\u0002\n\f\u0005\u0004\u0003\u0002\u000b\n\u0003\u0002\u0002\u0002",
    "\f\u000f\u0003\u0002\u0002\u0002\r\u000b\u0003\u0002\u0002\u0002\r\u000e",
    "\u0003\u0002\u0002\u0002\u000e\u0010\u0003\u0002\u0002\u0002\u000f\r",
    "\u0003\u0002\u0002\u0002\u0010\u0011\u0007\u0002\u0002\u0003\u0011\u0003",
    "\u0003\u0002\u0002\u0002\u0012\u0013\u0005\u0006\u0004\u0002\u0013\u0005",
    "\u0003\u0002\u0002\u0002\u0014\u0015\u0007\u0003\u0002\u0002\u0015\u0016",
    "\u0005\b\u0005\u0002\u0016\u0017\u0007\u0004\u0002\u0002\u0017\u0007",
    "\u0003\u0002\u0002\u0002\u0018\u0019\u0007\u0005\u0002\u0002\u0019\t",
    "\u0003\u0002\u0002\u0002\u0003\r"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'print'", "';'" ];

var symbolicNames = [ null, null, null, "STRING", "WS" ];

var ruleNames =  [ "program", "statement", "printStatement", "expression" ];

function SimpleLanguageParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

SimpleLanguageParser.prototype = Object.create(antlr4.Parser.prototype);
SimpleLanguageParser.prototype.constructor = SimpleLanguageParser;

Object.defineProperty(SimpleLanguageParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

SimpleLanguageParser.EOF = antlr4.Token.EOF;
SimpleLanguageParser.T__0 = 1;
SimpleLanguageParser.T__1 = 2;
SimpleLanguageParser.STRING = 3;
SimpleLanguageParser.WS = 4;

SimpleLanguageParser.RULE_program = 0;
SimpleLanguageParser.RULE_statement = 1;
SimpleLanguageParser.RULE_printStatement = 2;
SimpleLanguageParser.RULE_expression = 3;

function ProgramContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SimpleLanguageParser.RULE_program;
    return this;
}

ProgramContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ProgramContext.prototype.constructor = ProgramContext;

ProgramContext.prototype.EOF = function() {
    return this.getToken(SimpleLanguageParser.EOF, 0);
};

ProgramContext.prototype.statement = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(StatementContext);
    } else {
        return this.getTypedRuleContext(StatementContext,i);
    }
};

ProgramContext.prototype.enterRule = function(listener) {
    if(listener instanceof SimpleLanguageListener ) {
        listener.enterProgram(this);
	}
};

ProgramContext.prototype.exitRule = function(listener) {
    if(listener instanceof SimpleLanguageListener ) {
        listener.exitProgram(this);
	}
};




SimpleLanguageParser.ProgramContext = ProgramContext;

SimpleLanguageParser.prototype.program = function() {

    var localctx = new ProgramContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, SimpleLanguageParser.RULE_program);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 11;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===SimpleLanguageParser.T__0) {
            this.state = 8;
            this.statement();
            this.state = 13;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 14;
        this.match(SimpleLanguageParser.EOF);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function StatementContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SimpleLanguageParser.RULE_statement;
    return this;
}

StatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StatementContext.prototype.constructor = StatementContext;

StatementContext.prototype.printStatement = function() {
    return this.getTypedRuleContext(PrintStatementContext,0);
};

StatementContext.prototype.enterRule = function(listener) {
    if(listener instanceof SimpleLanguageListener ) {
        listener.enterStatement(this);
	}
};

StatementContext.prototype.exitRule = function(listener) {
    if(listener instanceof SimpleLanguageListener ) {
        listener.exitStatement(this);
	}
};




SimpleLanguageParser.StatementContext = StatementContext;

SimpleLanguageParser.prototype.statement = function() {

    var localctx = new StatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, SimpleLanguageParser.RULE_statement);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 16;
        this.printStatement();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function PrintStatementContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SimpleLanguageParser.RULE_printStatement;
    return this;
}

PrintStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
PrintStatementContext.prototype.constructor = PrintStatementContext;

PrintStatementContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

PrintStatementContext.prototype.enterRule = function(listener) {
    if(listener instanceof SimpleLanguageListener ) {
        listener.enterPrintStatement(this);
	}
};

PrintStatementContext.prototype.exitRule = function(listener) {
    if(listener instanceof SimpleLanguageListener ) {
        listener.exitPrintStatement(this);
	}
};




SimpleLanguageParser.PrintStatementContext = PrintStatementContext;

SimpleLanguageParser.prototype.printStatement = function() {

    var localctx = new PrintStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, SimpleLanguageParser.RULE_printStatement);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 18;
        this.match(SimpleLanguageParser.T__0);
        this.state = 19;
        this.expression();
        this.state = 20;
        this.match(SimpleLanguageParser.T__1);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ExpressionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SimpleLanguageParser.RULE_expression;
    return this;
}

ExpressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExpressionContext.prototype.constructor = ExpressionContext;

ExpressionContext.prototype.STRING = function() {
    return this.getToken(SimpleLanguageParser.STRING, 0);
};

ExpressionContext.prototype.enterRule = function(listener) {
    if(listener instanceof SimpleLanguageListener ) {
        listener.enterExpression(this);
	}
};

ExpressionContext.prototype.exitRule = function(listener) {
    if(listener instanceof SimpleLanguageListener ) {
        listener.exitExpression(this);
	}
};




SimpleLanguageParser.ExpressionContext = ExpressionContext;

SimpleLanguageParser.prototype.expression = function() {

    var localctx = new ExpressionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, SimpleLanguageParser.RULE_expression);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 22;
        this.match(SimpleLanguageParser.STRING);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exports.SimpleLanguageParser = SimpleLanguageParser;
