import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { EnvConfigServiceProps } from './env_config.interface';

@Injectable()
export class EnvConfigService implements EnvConfigServiceProps {
  constructor(private readonly configService: ConfigService) {}
  getAwsS3NameBucket(): string {
    const nodeEnv = String(
      this.configService.get<string>('AWS_S3_BUCKET_NAME'),
    );
    return nodeEnv;
  }
  getAwsS3RegionBucket(): string {
    const nodeEnv = String(this.configService.get<string>('AWS_REGION'));
    return nodeEnv;
  }
  getAwsS3AccessIdKey(): string {
    const nodeEnv = String(this.configService.get<string>('AWS_ACCESS_KEY_ID'));
    return nodeEnv;
  }
  getAwsS3SecreteKey(): string {
    const nodeEnv = String(
      this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
    );
    return nodeEnv;
  }
  getHashLoginToken(): string {
    const nodeEnv = String(this.configService.get<string>('JWT_LOGIN_HASH'));
    return nodeEnv;
  }
  getExpireLoginToken(): string {
    const nodeEnv = String(
      this.configService.get<string>('EXPIRE_LOGIN_TOKEN'),
    );
    return nodeEnv;
  }

  getHashPasswordEnv(): number {
    const nodeEnv = Number(
      this.configService.get<string>('EXPIRE_LOGIN_TOKEN'),
    );
    return nodeEnv;
  }
}
