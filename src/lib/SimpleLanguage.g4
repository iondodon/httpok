grammar SimpleLanguage;

program: statement* EOF;

statement: printStatement;

printStatement: 'print' expression ';';

expression: STRING;

STRING: '"' (~["\\\r\n] | '\\' ["\\])* '"';

WS: [ \t\r\n]+ -> skip; 