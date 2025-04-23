import type { HttpOkFullResponse } from './httpOkFullResponse';
import type { HttpOkRequest } from './httpOkRequest';
import { parseRequests } from './visitor'
import { invoke } from '@tauri-apps/api/core';

export class HttpOkLanguageService {
  async execute(input: string): Promise<any[]> {
    const responses = [];

    const requests = parseRequests(input);

    for (const request of requests) {
      const response = await this.fetchWithFullResponse(request);
      responses.push(response);
    }

    return responses;
  }

  async fetchWithFullResponse(request: HttpOkRequest): Promise<any> {
    const response: HttpOkFullResponse = await invoke('fetch_with_full_response', {
      request: request.toSerializable()
    });

    const contentType = response.headers['content-type']?.toLowerCase();

    if (contentType?.includes('application/json')) {
      try {
        response.body = JSON.parse(response.body);
      } catch (e) {
        console.warn('Invalid JSON body despite application/json header');
        // Leave body as string
      }
    }

    return response;
  }
}
