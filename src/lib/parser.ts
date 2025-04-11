import { CstParser } from "chevrotain";
import { Print, StringLiteral, Semicolon, allTokens } from "./tokens";

export class SimpleParser extends CstParser {
  constructor() {
    super(allTokens);
    this.performSelfAnalysis();
  }

  public program = this.RULE("program", () => {
    this.MANY(() => {
      this.SUBRULE(this.printStatement);
    });
  });

  private printStatement = this.RULE("printStatement", () => {
    this.CONSUME(Print);
    this.CONSUME(StringLiteral);
    this.CONSUME(Semicolon);
  });
}
