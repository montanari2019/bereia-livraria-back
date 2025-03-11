import { Module, DynamicModule } from '@nestjs/common';
import {
  ConfigModule,
  ConfigModuleOptions,
  ConfigService,
} from '@nestjs/config';
import { join } from 'path';
import { EnvConfigService } from './env_config.service';

@Module({})
export class EnvConfigModule {
  static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
    return {
      module: EnvConfigModule,
      imports: [
        ConfigModule.forRoot({
          ...options,
          envFilePath: [join(__dirname, `../../../../.env`)],
        }),
      ],
      providers: [EnvConfigService, ConfigService],
      exports: [EnvConfigService, ConfigService],
    };
  }
}
