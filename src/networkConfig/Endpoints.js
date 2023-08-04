export const Endpoints = {
  baseUrl: 'https://swapi.dev/api/',
  people: 'people/',
};

export const StatusCode = {
  TIMEOUT: 1111,
  NOTFOUNDCODE: 404,
  SERVERERRORCODE: 500,
  SUCCESS: 200,
  SESSIONTIMEOUTCODE: 403,
  CODE405: 405,
};

export const appSecretForAuthentication = 'XYZSTARWARS=APPDEMOSECRETKEYSAMPLE';

export const Auth0Config = {
  domain: 'dev-n54d3ahx6mnoi0ha.us.auth0.com',
  clientId: 'qsavhaP8qpW5ViscdngkOztSY2lI0xMN',
  audience: 'https://dev-n54d3ahx6mnoi0ha.us.auth0.com/api/v2/',
  scope:
    'openid profile email offline_access read:users read:current_user read:user_idp_tokens',
};
