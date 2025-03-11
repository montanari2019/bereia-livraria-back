import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { EnvConfigServiceProps } from './env_config.interface';

@Injectable()
export class EnvConfigService implements EnvConfigServiceProps {
  constructor(private readonly configService: ConfigService) {}

  getHashPasswordEnv(): string {
    const nodeEnv = String(this.configService.get<string>('PASSWORD_HASH'));
    return nodeEnv;
  }
}
