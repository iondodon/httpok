export interface HttpOkFullResponse {
    status: number;
    statusText: string;
    url: string;
    ok: boolean;
    headers: Record<string, string>;
    body: string;
    [key: string]: any;
  }
  