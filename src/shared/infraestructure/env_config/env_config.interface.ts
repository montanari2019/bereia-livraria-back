export interface EnvConfigServiceProps {
  getHashPasswordEnv(): number;
  getExpireLoginToken(): string;
  getHashLoginToken(): string;
}
