// Generated from SimpleLanguage.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by SimpleLanguageParser.
function SimpleLanguageListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

SimpleLanguageListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
SimpleLanguageListener.prototype.constructor = SimpleLanguageListener;

// Enter a parse tree produced by SimpleLanguageParser#program.
SimpleLanguageListener.prototype.enterProgram = function(ctx) {
};

// Exit a parse tree produced by SimpleLanguageParser#program.
SimpleLanguageListener.prototype.exitProgram = function(ctx) {
};


// Enter a parse tree produced by SimpleLanguageParser#statement.
SimpleLanguageListener.prototype.enterStatement = function(ctx) {
};

// Exit a parse tree produced by SimpleLanguageParser#statement.
SimpleLanguageListener.prototype.exitStatement = function(ctx) {
};


// Enter a parse tree produced by SimpleLanguageParser#printStatement.
SimpleLanguageListener.prototype.enterPrintStatement = function(ctx) {
};

// Exit a parse tree produced by SimpleLanguageParser#printStatement.
SimpleLanguageListener.prototype.exitPrintStatement = function(ctx) {
};


// Enter a parse tree produced by SimpleLanguageParser#expression.
SimpleLanguageListener.prototype.enterExpression = function(ctx) {
};

// Exit a parse tree produced by SimpleLanguageParser#expression.
SimpleLanguageListener.prototype.exitExpression = function(ctx) {
};



exports.SimpleLanguageListener = SimpleLanguageListener;