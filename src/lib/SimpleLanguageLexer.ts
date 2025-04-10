// Generated from src/lib/SimpleLanguage.g4 by ANTLR 4.9.0-SNAPSHOT


import type { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import type { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import  { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator";
import type { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";


export class SimpleLanguageLexer extends Lexer {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly STRING = 3;
	public static readonly WS = 4;

	// tslint:disable:no-trailing-whitespace
	public static readonly channelNames: string[] = [
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN",
	];

	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE",
	];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "STRING", "WS",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'print'", "';'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, "STRING", "WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(SimpleLanguageLexer._LITERAL_NAMES, SimpleLanguageLexer._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return SimpleLanguageLexer.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(SimpleLanguageLexer._ATN, this);
	}

	// @Override
	public get grammarFileName(): string { return "SimpleLanguage.g4"; }

	// @Override
	public get ruleNames(): string[] { return SimpleLanguageLexer.ruleNames; }

	// @Override
	public get serializedATN(): string { return SimpleLanguageLexer._serializedATN; }

	// @Override
	public get channelNames(): string[] { return SimpleLanguageLexer.channelNames; }

	// @Override
	public get modeNames(): string[] { return SimpleLanguageLexer.modeNames; }

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\x06%\b\x01\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x03\x02\x03\x02\x03" +
		"\x02\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x04\x03\x04\x03\x04\x03" +
		"\x04\x07\x04\x18\n\x04\f\x04\x0E\x04\x1B\v\x04\x03\x04\x03\x04\x03\x05" +
		"\x06\x05 \n\x05\r\x05\x0E\x05!\x03\x05\x03\x05\x02\x02\x02\x06\x03\x02" +
		"\x03\x05\x02\x04\x07\x02\x05\t\x02\x06\x03\x02\x05\x06\x02\f\f\x0F\x0F" +
		"$$^^\x04\x02$$^^\x05\x02\v\f\x0F\x0F\"\"\x02\'\x02\x03\x03\x02\x02\x02" +
		"\x02\x05\x03\x02\x02\x02\x02\x07\x03\x02\x02\x02\x02\t\x03\x02\x02\x02" +
		"\x03\v\x03\x02\x02\x02\x05\x11\x03\x02\x02\x02\x07\x13\x03\x02\x02\x02" +
		"\t\x1F\x03\x02\x02\x02\v\f\x07r\x02\x02\f\r\x07t\x02\x02\r\x0E\x07k\x02" +
		"\x02\x0E\x0F\x07p\x02\x02\x0F\x10\x07v\x02\x02\x10\x04\x03\x02\x02\x02" +
		"\x11\x12\x07=\x02\x02\x12\x06\x03\x02\x02\x02\x13\x19\x07$\x02\x02\x14" +
		"\x18\n\x02\x02\x02\x15\x16\x07^\x02\x02\x16\x18\t\x03\x02\x02\x17\x14" +
		"\x03\x02\x02\x02\x17\x15\x03\x02\x02\x02\x18\x1B\x03\x02\x02\x02\x19\x17" +
		"\x03\x02\x02\x02\x19\x1A\x03\x02\x02\x02\x1A\x1C\x03\x02\x02\x02\x1B\x19" +
		"\x03\x02\x02\x02\x1C\x1D\x07$\x02\x02\x1D\b\x03\x02\x02\x02\x1E \t\x04" +
		"\x02\x02\x1F\x1E\x03\x02\x02\x02 !\x03\x02\x02\x02!\x1F\x03\x02\x02\x02" +
		"!\"\x03\x02\x02\x02\"#\x03\x02\x02\x02#$\b\x05\x02\x02$\n\x03\x02\x02" +
		"\x02\x06\x02\x17\x19!\x03\b\x02\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!SimpleLanguageLexer.__ATN) {
			SimpleLanguageLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(SimpleLanguageLexer._serializedATN));
		}

		return SimpleLanguageLexer.__ATN;
	}

}

