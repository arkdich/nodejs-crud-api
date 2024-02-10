export const MIME_TYPES = {
  JSON: 'application/json',
}

export class ResponseError {
  public code: number
  public message: string

  constructor(code: number, message: string) {
    this.code = code
    this.message = message
  }
}
