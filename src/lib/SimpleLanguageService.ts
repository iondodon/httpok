import antlr4 from "antlr4";
import SimpleLanguageLexer from "./SimpleLanguageLexer";
import SimpleLanguageParser from "./SimpleLanguageParser";
import { ExecuteVisitor } from "./ExecuteVisitor";

export class SimpleLanguageService {
  execute(code: string): string[] {
    const chars = new antlr4.CharStream(code);
    const lexer = new SimpleLanguageLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new SimpleLanguageParser(tokens);
    parser.buildParseTrees = true;

    const tree = parser.program();
    const visitor = new ExecuteVisitor();
    visitor.visit(tree);

    return visitor.output;
  }
}
