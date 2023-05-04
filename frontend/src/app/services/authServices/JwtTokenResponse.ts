export class JwtTokenResponse {
  constructor(
    public id: number,
    public email: string,
    public roles: string[],
    public accessToken: string,
    public tokenType: string,
  ) {}
}
