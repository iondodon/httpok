export class SimpleLanguageService {
  async execute(input: string): Promise<Response & { bodyParsed: any }> {
    const lines = input.trim().split("\n");
    const [methodAndUrl, ...headerLines] = lines;

    const [method, url] = methodAndUrl.split(" ");
    const headers: Record<string, string> = {};

    for (const line of headerLines) {
      const [key, ...rest] = line.split(":");
      headers[key.trim()] = rest.join(":").trim();
    }

    const res = await fetch(url, { method, headers });

    const contentType = res.headers.get("content-type") || "";
    const bodyParsed = contentType.includes("application/json")
      ? await res.json()
      : await res.text();

    return Object.assign(res, { bodyParsed });
  }
}
