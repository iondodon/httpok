import { execute } from "./interpreter";

export class SimpleLanguageService {
  async execute(code: string): Promise<string[]> {
    try {
      return await execute(code);
    } catch (e) {
      console.error("Execution error:", e);
      return [`ERROR: ${e instanceof Error ? e.message : String(e)}`];
    }
  }
}
