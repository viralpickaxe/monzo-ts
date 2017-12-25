export interface OAuthTokens {
  access_token: string;
  client_id: string;
  expires_in: number;
  refresh_token: string;
  token_type: 'Bearer';
  user_id: string;
}

export interface OAuthWhoAmI {
  authenticated: boolean;
  client_id: string;
  user_id: string;
}
