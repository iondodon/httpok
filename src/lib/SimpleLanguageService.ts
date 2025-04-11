import {execute } from './visitor'

export class SimpleLanguageService {
  async execute(input: string): Promise<any> {
 
    const resp = execute(input)

    return resp
  }
}
