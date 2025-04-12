import { defaultLexerErrorProvider } from 'chevrotain';
import { parseRequests } from './visitor'

export class SimpleLanguageService {
  async execute(input: string): Promise<any[]> {
    const responses = []
 
    const requests = parseRequests(input)

    for (const request of requests) {
      const start = performance.now();
      const respData = await this.fetchWithFullResponse(request)
      const end = performance.now();
      const duration = end - start;
      console.log(respData)
      responses.push({ duration, ...respData })
    }

    return responses
  }

  async fetchWithFullResponse(request: Request) {
    const response = await fetch(request);
  
    // Clone the response so we can read the body without affecting the original stream
    const clonedResponse = response.clone();
  
    // Try to parse the body in various formats
    let body;
    const contentType = response.headers.get('content-type') || '';
  
    if (contentType.includes('application/json')) {
      body = await clonedResponse.json();
    } else if (contentType.includes('text/')) {
      body = await clonedResponse.text();
    } else if (contentType.includes('form')) {
      body = await clonedResponse.formData();
    } else if (contentType.includes('image') || contentType.includes('video') || contentType.includes('application/octet-stream')) {
      body = await clonedResponse.blob();
    } else {
      body = await clonedResponse.arrayBuffer(); // fallback
    }
  
    return {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      redirected: response.redirected,
      url: response.url,
      headers: Object.fromEntries(response.headers.entries()),
      body, // this could be JSON, text, Blob, etc.
    };
  }
  
  
}
