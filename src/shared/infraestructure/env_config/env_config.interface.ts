export interface EnvConfigServiceProps {
  getHashPasswordEnv(): number;
  getExpireLoginToken(): string;
  getHashLoginToken(): string;
  getAwsS3NameBucket(): string;
  getAwsS3RegionBucket(): string;
  getAwsS3AccessIdKey(): string;
  getAwsS3SecreteKey(): string;
  getItensPerPage(): number;
}
