export interface ValidateTokenInterface {
  validateToken(token: string): Promise<any>;
}
