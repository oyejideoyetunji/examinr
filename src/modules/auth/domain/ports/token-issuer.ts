export type UserJwtParams = {
  userId: string;
  email: string;
}

export interface TokenIssuer {
  issueFor(params: UserJwtParams): string;
  verify(token: string): UserJwtParams;
}
