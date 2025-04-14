import { CstParser, EOF } from "chevrotain";
import { allTokens, Method, Comment, Url, BodyLine, Header, Newline } from "./lexer.js"; // make sure extension matches your setup

export class HttpParser extends CstParser {
  [x: string]: any;
  constructor() {
    super(allTokens);

    const $ = this;

    $.RULE("commentBlock", () => {
      $.AT_LEAST_ONE(() => {
        $.CONSUME(Comment);
        $.OPTION(() => $.CONSUME(Newline));
      });
    });

    $.RULE("program", () => {
      $.MANY(() => {
        $.SUBRULE($.httpRequest);
      });

      $.MANY8(() => {
        $.OR([
          { ALT: () => $.SUBRULE8($.commentBlock) },
          { ALT: () => $.CONSUME8(Newline) }
        ]);
      });

      $.OPTION(() => $.CONSUME(EOF));
    });

    $.RULE("httpRequest", () => {
      $.MANY(() => {
        $.OR([
          { ALT: () => $.SUBRULE($.commentBlock) },
          { ALT: () => $.CONSUME(Newline) }
        ]);
      });

      $.CONSUME1(Method);
      $.CONSUME2(Url);
      $.CONSUME3(Newline);
    
      $.MANY4(() => {
        $.CONSUME4(Header);
        $.CONSUME4(Newline);
      });
    
      $.MANY5(() => {
        $.CONSUME5(Newline);
      });
    
      $.MANY6(() => {
        $.CONSUME6(BodyLine);
        $.OPTION(() => $.CONSUME6(Newline));
      });
    
      $.MANY7(() => {
        $.CONSUME7(Newline);
      });
    }); 

    this.performSelfAnalysis();
  }
}
