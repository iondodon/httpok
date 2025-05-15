import { CstParser, EOF } from "chevrotain";
import { allTokens, Method, Comment, Url, BodyLine, BodyDelimiter, Header, Newline } from "./lexer.js"; // make sure extension matches your setup

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

    $.RULE("requestBody", () => {
      $.CONSUME1(BodyDelimiter);
      $.CONSUME2(Newline);
      
      $.MANY(() => {
        $.CONSUME3(BodyLine);
        $.CONSUME4(Newline);
      });
      
      $.CONSUME5(BodyDelimiter);
      $.OPTION(() => $.CONSUME6(Newline));
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
    
      $.OPTION(() => {
        $.SUBRULE($.requestBody);
      });
    
      $.MANY7(() => {
        $.OR7([
          { ALT: () => $.SUBRULE7($.commentBlock) },
          { ALT: () => $.CONSUME7(Newline) }
        ]);
      });
    }); 

    this.performSelfAnalysis();
  }
}
