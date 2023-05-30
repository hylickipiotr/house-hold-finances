export type EnvName = 'PORT';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: string;
      JWKS_URI: string;
      AUDIENCE: string;
      ISSUER: string;
    }
  }
}
