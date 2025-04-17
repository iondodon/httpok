import { SimpleLexer } from "./lexer.js";
import { HttpParser } from "./parser.js";
import { HttpOkRequest } from "./httpOkRequest.js";

const parser = new HttpParser();
const BaseVisitor = parser.getBaseCstVisitorConstructorWithDefaults();

class Visitor extends BaseVisitor {
  requests: HttpOkRequest[] = [];

  constructor() {
    super();
    this.validateVisitor();
  }

  program(ctx: any) {
    for (const request of ctx.httpRequest ?? []) {
      this.visit(request);
    }
  }

  httpRequest(ctx: any) {
    const method = ctx.Method[0].image;
    const url = ctx.Url[0].image;
    const headers: Record<string, string> = {};
  
    if (ctx.Header) {
      for (const h of ctx.Header) {
        const [key, ...valueParts] = h.image.split(":");
        headers[key.trim()] = valueParts.join(":").trim();
      }
    }
  
    let body: string | undefined = undefined;
  
    if (ctx.BodyLine) {
      // Remove the leading '|' and join lines with newline
      body = ctx.BodyLine.map((b: any) => b.image.slice(1)).join("\n");
    }
  
    const req = new HttpOkRequest(url, {
      method,
      headers: headers,
      body: body ?? null,
    });
  
    this.requests.push(req);
  }
}

export function parseRequests(code: string): HttpOkRequest[] {
  // ennsure there is a newline at the end
  // this helps to have a simpler grammar
  code = code.endsWith("\n") ? code : code + "\n"
  const lex = SimpleLexer.tokenize(code);
  parser.input = lex.tokens;

  const cst = parser.program();
  if (parser.errors.length > 0) {
    console.error(parser.errors);
    throw new Error("Parsing error");
  }

  const visitor = new Visitor();
  visitor.visit(cst);
  return visitor.requests;
}
