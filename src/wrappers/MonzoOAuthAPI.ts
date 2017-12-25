export class MonzoOAuthAPI {
  public constructor(
    private clientId: string,
    private clientSecret: string,
    private redirectUrl: string,
  ) {
    if (clientId === undefined || clientId.length === 0) {
      throw new Error('No clientId provided');
    } else if (clientSecret === undefined || clientSecret.length === 0) {
      throw new Error('No clientSecret provided');
    } else if (redirectUrl === undefined || redirectUrl.length === 0) {
      throw new Error('No redirectUrl provided');
    }
  }

  public generateAuthUrl(stateToken?: string): string {
    return `https://auth.getmondo.co.uk/?` +
      `client_id=${this.clientId}&` +
      `redirect_uri=${this.redirectUrl}&` +
      `response_type=code&` +
      `state=${stateToken || ''}`;
  }
}
