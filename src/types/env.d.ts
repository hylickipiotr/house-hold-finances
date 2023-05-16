export type EnvName = 'PORT';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
    }
  }
}
