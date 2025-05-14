export class HttpOkRequest {
    method: string;
    url: string;
    headers?: Record<string, string>;
    body?: string | null;
    isMultipart: boolean;
  
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
      this.isMultipart = headers?.['Content-Type']?.toLowerCase().includes('multipart/form-data') ?? false;
    }
   
    toSerializable(): object {
      return {
        method: this.method,
        url: this.url,
        headers: this.headers ?? {},
        body: this.body,
        is_multipart: this.isMultipart,
      };
    }
  }