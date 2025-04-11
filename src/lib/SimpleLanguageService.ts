import { execute } from "./interpreter";

export class SimpleLanguageService {
  execute(code: string): string[] {
    try {
      return execute(code);
    } catch (e) {
      console.error("Execution error:", e);
      return [`ERROR: ${e instanceof Error ? e.message : String(e)}`];
    }
  }
}
