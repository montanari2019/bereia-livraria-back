import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { EnvConfigServiceProps } from './env_config.interface';

@Injectable()
export class EnvConfigService implements EnvConfigServiceProps {
  constructor(private readonly configService: ConfigService) {}
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
