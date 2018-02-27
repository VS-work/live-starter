interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
  RESPONSE_TYPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'UMw9wiTfdQBLCnaGWqnIV8TrgXL85v0F',
  CLIENT_DOMAIN: 'dev-live-starter.auth0.com',
  AUDIENCE: 'dev-live-starter',
  REDIRECT: '',
  SCOPE: 'openid profile email',
  RESPONSE_TYPE: 'token id_token'
};
