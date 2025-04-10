import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { SimpleLanguageLexer } from './SimpleLanguageLexer';
import { SimpleLanguageParser } from './SimpleLanguageParser';
import { SimpleLanguageExecutor } from './SimpleLanguageExecutor';

export class SimpleLanguageService {
    execute(code: string): string[] {
        console.log("Creating input stream...");
        const inputStream = CharStreams.fromString(code);

        console.log("Creating lexer...");
        const lexer = new SimpleLanguageLexer(inputStream);

        console.log("Creating token stream...");
        const tokenStream = new CommonTokenStream(lexer);

        console.log("Creating parser...");
        const parser = new SimpleLanguageParser(tokenStream);

        console.log("Parsing program...");
        const tree = parser.program();

        console.log("Executing program...");
        const executor = new SimpleLanguageExecutor();
        executor.execute(tree);

        console.log("Execution done!");
        return executor.getOutput();
    }
} 