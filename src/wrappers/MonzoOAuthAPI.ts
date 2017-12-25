import axios from 'axios';
import { OAuthTokens, OAuthWhoAmI } from '../entities/OAuth';
import { MonzoAPI } from './MonzoAPI';
import { stringify } from 'qs';

export class MonzoOAuthAPI extends MonzoAPI {
  public constructor(
    private clientId: string,
    private clientSecret: string,
    private redirectUrl: string,
  ) {
    super();

    if (clientId === undefined || clientId.length === 0) {
      throw new Error('No clientId provided');
    } else if (clientSecret === undefined || clientSecret.length === 0) {
      throw new Error('No clientSecret provided');
    } else if (redirectUrl === undefined || redirectUrl.length === 0) {
      throw new Error('No redirectUrl provided');
    }
  }

  public generateAuthUrl(stateToken?: string): string {
    return `https://auth.monzo.com/?` +
      `client_id=${this.clientId}&` +
      `redirect_uri=${encodeURIComponent(this.redirectUrl)}&` +
      `response_type=code&` +
      `state=${stateToken || ''}`;
  }

  public async exchangeCode(code: string): Promise<OAuthTokens> {
    const response = await axios.post<OAuthTokens>(
      `${this.baseUrl}/oauth2/token`,
      stringify({
        grant_type: 'authorization_code',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        redirect_uri: this.redirectUrl,
        code,
      }),
      {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return response.data;
  }

  public async refreshToken(refreshToken: string): Promise<OAuthTokens> {
    const response = await axios.post<OAuthTokens>(
      `${this.baseUrl}/oauth2/token`,
      stringify({
        grant_type: 'refresh_token',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: refreshToken,
      }),
      {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      },
    );
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
