import { CstParser, EOF } from "chevrotain";
import { allTokens, Method, Url, Header, Newline } from "./lexer.js"; // make sure extension matches your setup

export class HttpParser extends CstParser {
  [x: string]: any;
  constructor() {
    super(allTokens);

    const $ = this;

    $.RULE("program", () => {
      $.MANY(() => {
        $.SUBRULE($.httpRequest);
      });
      $.OPTION(() => $.CONSUME(EOF));
    });

    $.RULE("httpRequest", () => {
      $.CONSUME(Method);
      $.CONSUME(Url);

      $.MANY(() => {
        $.CONSUME(Newline);
        $.OPTION(() => {
          $.CONSUME(Header);
        });
      });
    });

    this.performSelfAnalysis();
  }
}
