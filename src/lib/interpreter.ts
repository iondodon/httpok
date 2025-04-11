import { SimpleLexer } from "./tokens";
import { HttpParser } from "./parser";

const parser = new HttpParser();
const BaseVisitor = parser.getBaseCstVisitorConstructorWithDefaults();

class Interpreter extends BaseVisitor {
  output: string[] = [];

  constructor() {
    super();
  }

  async program(ctx: any) {
    for (const call of ctx.httpGet || []) {
      await this.visit(call as any); // cast to avoid TS error
    }
  }

  async httpGet(ctx: any) {
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
    throw new Error("Parsing error");
  }

  const interpreter = new Interpreter();
  await (interpreter as any).visit(cst); // 👈 avoids TS complaint
  return interpreter.output;
}
