import { SimpleLexer } from "./lexer";
import { HttpParser } from "./parser";

const parser = new HttpParser();
const BaseVisitor = parser.getBaseCstVisitorConstructorWithDefaults();

class Visitor extends BaseVisitor {
  [x: string]: any;
  output: string[] = [];

  constructor() {
    super();
  }

  async program(ctx: any) {
    debugger
    for (const request of ctx.httpRequest || []) {
      await this.visit(request as any); // cast to avoid TS error
    }
  }

  async httpRequest(ctx: any) {
    debugger
    const url = ctx.Url[0].image;
    const headers: Record<string, string> = {};

    if (ctx.Header) {
      for (const h of ctx.Header) {
        const [key, ...value] = h.image.split(":");
        headers[key.trim()] = value.join(":").trim();
      }
    }

    try {
      const res = await fetch(url, { method: "GET", headers });
      const text = await res.text();
      const snippet = text.slice(0, 200);
      this.output.push(`[GET] ${url}\n→ ${snippet}`);
    } catch (err) {
      this.output.push(`[GET] ${url} failed: ${String(err)}`);
    }
  }
}

export async function execute(code: string): Promise<string[]> {
  const lex = SimpleLexer.tokenize(code);
  parser.input = lex.tokens;

  const cst = parser.program();
  if (parser.errors.length > 0) {
    console.log(parser.errors)
    throw new Error("Parsing error");
  }

  const visitor = new Visitor();
  const out = await visitor.visit(cst); // 👈 avoids TS complaint
  return visitor.output;
}
