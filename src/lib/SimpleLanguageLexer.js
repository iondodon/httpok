// Generated from SimpleLanguage.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0002\u0006%\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0003\u0002\u0003\u0002\u0003\u0002",
    "\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0007\u0004\u0018\n\u0004\f\u0004",
    "\u000e\u0004\u001b\u000b\u0004\u0003\u0004\u0003\u0004\u0003\u0005\u0006",
    "\u0005 \n\u0005\r\u0005\u000e\u0005!\u0003\u0005\u0003\u0005\u0002\u0002",
    "\u0006\u0003\u0003\u0005\u0004\u0007\u0005\t\u0006\u0003\u0002\u0005",
    "\u0006\u0002\f\f\u000f\u000f$$^^\u0004\u0002$$^^\u0005\u0002\u000b\f",
    "\u000f\u000f\"\"\u0002\'\u0002\u0003\u0003\u0002\u0002\u0002\u0002\u0005",
    "\u0003\u0002\u0002\u0002\u0002\u0007\u0003\u0002\u0002\u0002\u0002\t",
    "\u0003\u0002\u0002\u0002\u0003\u000b\u0003\u0002\u0002\u0002\u0005\u0011",
    "\u0003\u0002\u0002\u0002\u0007\u0013\u0003\u0002\u0002\u0002\t\u001f",
    "\u0003\u0002\u0002\u0002\u000b\f\u0007r\u0002\u0002\f\r\u0007t\u0002",
    "\u0002\r\u000e\u0007k\u0002\u0002\u000e\u000f\u0007p\u0002\u0002\u000f",
    "\u0010\u0007v\u0002\u0002\u0010\u0004\u0003\u0002\u0002\u0002\u0011",
    "\u0012\u0007=\u0002\u0002\u0012\u0006\u0003\u0002\u0002\u0002\u0013",
    "\u0019\u0007$\u0002\u0002\u0014\u0018\n\u0002\u0002\u0002\u0015\u0016",
    "\u0007^\u0002\u0002\u0016\u0018\t\u0003\u0002\u0002\u0017\u0014\u0003",
    "\u0002\u0002\u0002\u0017\u0015\u0003\u0002\u0002\u0002\u0018\u001b\u0003",
    "\u0002\u0002\u0002\u0019\u0017\u0003\u0002\u0002\u0002\u0019\u001a\u0003",
    "\u0002\u0002\u0002\u001a\u001c\u0003\u0002\u0002\u0002\u001b\u0019\u0003",
    "\u0002\u0002\u0002\u001c\u001d\u0007$\u0002\u0002\u001d\b\u0003\u0002",
    "\u0002\u0002\u001e \t\u0004\u0002\u0002\u001f\u001e\u0003\u0002\u0002",
    "\u0002 !\u0003\u0002\u0002\u0002!\u001f\u0003\u0002\u0002\u0002!\"\u0003",
    "\u0002\u0002\u0002\"#\u0003\u0002\u0002\u0002#$\b\u0005\u0002\u0002",
    "$\n\u0003\u0002\u0002\u0002\u0006\u0002\u0017\u0019!\u0003\b\u0002\u0002"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

function SimpleLanguageLexer(input) {
	antlr4.Lexer.call(this, input);
    this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    return this;
}

SimpleLanguageLexer.prototype = Object.create(antlr4.Lexer.prototype);
SimpleLanguageLexer.prototype.constructor = SimpleLanguageLexer;

Object.defineProperty(SimpleLanguageLexer.prototype, "atn", {
        get : function() {
                return atn;
        }
});

SimpleLanguageLexer.EOF = antlr4.Token.EOF;
SimpleLanguageLexer.T__0 = 1;
SimpleLanguageLexer.T__1 = 2;
SimpleLanguageLexer.STRING = 3;
SimpleLanguageLexer.WS = 4;

SimpleLanguageLexer.prototype.channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];

SimpleLanguageLexer.prototype.modeNames = [ "DEFAULT_MODE" ];

SimpleLanguageLexer.prototype.literalNames = [ null, "'print'", "';'" ];

SimpleLanguageLexer.prototype.symbolicNames = [ null, null, null, "STRING", 
                                                "WS" ];

SimpleLanguageLexer.prototype.ruleNames = [ "T__0", "T__1", "STRING", "WS" ];

SimpleLanguageLexer.prototype.grammarFileName = "SimpleLanguage.g4";



exports.SimpleLanguageLexer = SimpleLanguageLexer;

