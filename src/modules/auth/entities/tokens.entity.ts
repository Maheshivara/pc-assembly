export class TokensEntity {
  constructor(
    public readonly accessToken: string,
    public readonly refreshToken: string,
  ) {}
}
