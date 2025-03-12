import { Module, DynamicModule } from '@nestjs/common';
import {
  ConfigModule,
  ConfigModuleOptions,
  ConfigService,
} from '@nestjs/config';
import { join } from 'path';
import { EnvConfigService } from './env_config.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class EnvConfigModule {}
