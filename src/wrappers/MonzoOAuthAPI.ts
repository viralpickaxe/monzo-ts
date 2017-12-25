import axios from 'axios';
import { OAuthTokens, OAuthWhoAmI } from '../entities/OAuth';

export class MonzoOAuthAPI {
  private baseUrl = 'https://api.monzo.com';

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

  public async exchangeCode(code: string): Promise<OAuthTokens> {
    const response = await axios.post<OAuthTokens>(`${this.baseUrl}/oauth2/token`, {
      grant_type: 'authorization_code',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      redirect_uri: this.redirectUrl,
      code,
    });
    return response.data;
  }

  public async refreshToken(refreshToken: string): Promise<OAuthTokens> {
    const response = await axios.post<OAuthTokens>(`${this.baseUrl}/oauth2/token`, {
      grant_type: 'refresh_token',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      refresh_token: refreshToken,
    });
    return response.data;
  }

  public async me(accessToken: string): Promise<OAuthWhoAmI> {
    const response = await axios.get<OAuthWhoAmI>(`${this.baseUrl}/ping/whoami`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
}
