import { CstParser } from "chevrotain";
import { allTokens, Get, Url, Header, Newline } from "./tokens";

export class HttpParser extends CstParser {
  constructor() {
    super(allTokens);
    this.performSelfAnalysis();
  }

  public program = this.RULE("program", () => {
    this.MANY(() => this.SUBRULE(this.httpGet));
  });

  private httpGet = this.RULE("httpGet", () => {
    this.CONSUME(Get);
    this.CONSUME(Url);
    this.MANY(() => {
      this.CONSUME(Newline);
      this.OPTION(() => this.CONSUME(Header));
    });
  });
}
