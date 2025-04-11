// Generated from SimpleLanguage.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
import {
	ATN,
	ATNDeserializer,
	CharStream,
	DecisionState, DFA,
	Lexer,
	LexerATNSimulator,
	RuleContext,
	PredictionContextCache,
	Token
} from "antlr4";
export default class SimpleLanguageLexer extends Lexer {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly STRING = 3;
	public static readonly WS = 4;
	public static readonly EOF = Token.EOF;

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	public static readonly literalNames: (string | null)[] = [ null, "'print'", 
                                                            "';'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, "STRING", 
                                                             "WS" ];
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "STRING", "WS",
	];


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(this, SimpleLanguageLexer._ATN, SimpleLanguageLexer.DecisionsToDFA, new PredictionContextCache());
	}

	public get grammarFileName(): string { return "SimpleLanguage.g4"; }

	public get literalNames(): (string | null)[] { return SimpleLanguageLexer.literalNames; }
	public get symbolicNames(): (string | null)[] { return SimpleLanguageLexer.symbolicNames; }
	public get ruleNames(): string[] { return SimpleLanguageLexer.ruleNames; }

	public get serializedATN(): number[] { return SimpleLanguageLexer._serializedATN; }

	public get channelNames(): string[] { return SimpleLanguageLexer.channelNames; }

	public get modeNames(): string[] { return SimpleLanguageLexer.modeNames; }

	public static readonly _serializedATN: number[] = [4,0,4,35,6,-1,2,0,7,
	0,2,1,7,1,2,2,7,2,2,3,7,3,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,2,1,2,1,2,1,
	2,5,2,22,8,2,10,2,12,2,25,9,2,1,2,1,2,1,3,4,3,30,8,3,11,3,12,3,31,1,3,1,
	3,0,0,4,1,1,3,2,5,3,7,4,1,0,3,4,0,10,10,13,13,34,34,92,92,2,0,34,34,92,
	92,3,0,9,10,13,13,32,32,37,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,
	0,0,1,9,1,0,0,0,3,15,1,0,0,0,5,17,1,0,0,0,7,29,1,0,0,0,9,10,5,112,0,0,10,
	11,5,114,0,0,11,12,5,105,0,0,12,13,5,110,0,0,13,14,5,116,0,0,14,2,1,0,0,
	0,15,16,5,59,0,0,16,4,1,0,0,0,17,23,5,34,0,0,18,22,8,0,0,0,19,20,5,92,0,
	0,20,22,7,1,0,0,21,18,1,0,0,0,21,19,1,0,0,0,22,25,1,0,0,0,23,21,1,0,0,0,
	23,24,1,0,0,0,24,26,1,0,0,0,25,23,1,0,0,0,26,27,5,34,0,0,27,6,1,0,0,0,28,
	30,7,2,0,0,29,28,1,0,0,0,30,31,1,0,0,0,31,29,1,0,0,0,31,32,1,0,0,0,32,33,
	1,0,0,0,33,34,6,3,0,0,34,8,1,0,0,0,4,0,21,23,31,1,6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!SimpleLanguageLexer.__ATN) {
			SimpleLanguageLexer.__ATN = new ATNDeserializer().deserialize(SimpleLanguageLexer._serializedATN);
		}

		return SimpleLanguageLexer.__ATN;
	}


	static DecisionsToDFA = SimpleLanguageLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}