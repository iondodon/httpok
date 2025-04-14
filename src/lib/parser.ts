import { CstParser, EOF } from "chevrotain";
import { allTokens, Method, Url, BodyLine, Header, Newline } from "./lexer.js"; // make sure extension matches your setup

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
      $.CONSUME(Newline);
    
      $.MANY(() => {
        $.CONSUME(Header);
        $.CONSUME2(Newline);
      });
    
      $.MANY3(() => {
        $.CONSUME3(Newline);
      });
    
      $.MANY4(() => {
        $.CONSUME(BodyLine);
        $.OPTION(() => $.CONSUME4(Newline));
      });
    
      $.MANY5(() => {
        $.CONSUME5(Newline);
      });
    }); 

    this.performSelfAnalysis();
  }
}
