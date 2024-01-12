import { isProduction } from './env';

export const REFRESH_TOKEN_KEY = 'Refresh';

export const REFRESH_TOKEN_OPTION = () => ({
  ...(isProduction() ? { domain: process.env.BACKEND_SERVICE_DOMAIN } : {}),
  httpOnly: isProduction(),
  secure: isProduction(),
  maxAge: 2592000000,
});
