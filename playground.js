(function httpGrammarWithBody() {
  const { createToken, Lexer, CstParser, EOF } = chevrotain;

  // ----------------- Tokens -----------------
  const Method = createToken({
    name: "Method",
    pattern: /GET|POST|PUT|DELETE|PATCH|OPTIONS|HEAD/,
  });

  const Url = createToken({
    name: "Url",
    pattern: /https?:\/\/[^\s]+/,
  });

  const BodyLine = createToken({
    name: "BodyLine",
    pattern: /\|[^\n\r]*/,
    line_breaks: false,
  });

  const Header = createToken({
    name: "Header",
    pattern: /[A-Za-z0-9\-]+:\s*[^\n\r]+/,
    line_breaks: false,
  });

  const Newline = createToken({
    name: "Newline",
    pattern: /\r?\n/,
    line_breaks: true,
  });

  const WhiteSpace = createToken({
    name: "WhiteSpace",
    pattern: /[ \t]+/,
    group: Lexer.SKIPPED,
  });

  // Order matters: more specific first
  const allTokens = [
    WhiteSpace,
    Method,
    Url,
    BodyLine, // Must come before Header
    Header,
    Newline,
  ];

  const SimpleLexer = new Lexer(allTokens);

  // ----------------- Parser -----------------
  class HttpParser extends CstParser {
    constructor() {
      super(allTokens);
      const $ = this;

      $.RULE("program", () => {
        $.MANY(() => $.SUBRULE($.httpRequest));
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

  return {
    lexer: SimpleLexer,
    parser: HttpParser,
    defaultRule: "program",
  };
}());
