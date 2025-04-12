import { SimpleLexer } from "./lexer.js";
import { HttpParser } from "./parser.js";

const parser = new HttpParser();
const BaseVisitor = parser.getBaseCstVisitorConstructorWithDefaults();

class Visitor extends BaseVisitor {
  requests: Request[] = [];

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

    const req = new Request(url, {
      method,
      headers: new Headers(headers),
    });

    this.requests.push(req);
  }
}

export function parseRequests(code: string): Request[] {
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
