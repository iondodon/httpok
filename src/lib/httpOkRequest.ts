export class HttpOkRequest {
    method: string;
    url: string;
    headers?: Record<string, string>;
    body?: string | null;
  
    constructor(
      url: string,
      {
        method,
        headers,
        body,
      }: {
        method: string;
        headers?: Record<string, string>;
        body?: string | null;
      }
    ) {
      this.url = url;
      this.method = method;
      this.headers = headers;
      this.body = body ?? null;
    }
   
    toSerializable(): object {
      return {
        method: this.method,
        url: this.url,
        headers: this.headers ?? {},
        body: this.body,
      };
    }
  }