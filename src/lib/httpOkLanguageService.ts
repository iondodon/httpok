import type { HttpOkFullResponse } from './httpOkFullResponse';
import type { HttpOkRequest } from './httpOkRequest';
import { parseRequests } from './visitor'
import { invoke } from '@tauri-apps/api/core';

export class HttpOkLanguageService {
  async execute(input: string): Promise<any[]> {
    const responses = [];

    const requests = parseRequests(input);

    for (const request of requests) {
      const start = performance.now();
      const respData = await this.fetchWithFullResponse(request);
      const end = performance.now();
      const duration = end - start;
      responses.push({ duration, ...respData });
    }

    return responses;
  }

  async fetchWithFullResponse(request: HttpOkRequest): Promise<any> {
    const response: HttpOkFullResponse = await invoke('fetch_with_full_response', {
      method: request.method,
      url: request.url,
      headers: request.headers ?? {},
      body: request.body ? String(request.body) : null,
    });

    response.body = JSON.parse(response.body)

    return response;
  }
}
