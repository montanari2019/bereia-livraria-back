import { Module } from '@nestjs/common';

import { S3Controller } from './s3.controller';
import { EnvConfigModule } from 'src/shared/infraestructure/env_config/env-config.module';
import { S3UploadImagemService } from './services/s3UploadImage.service';
import { S3DeleteImagemService } from './services/s3DeleteImage.service';
import { S3GraphService } from './services/s3Graph.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthJwtModule } from 'src/auth_jwt/auth_jwt.module';

@Module({
  controllers: [S3Controller],
  providers: [S3UploadImagemService, S3DeleteImagemService, S3GraphService],
  exports: [S3UploadImagemService, S3DeleteImagemService],
  imports: [EnvConfigModule, PrismaModule, AuthJwtModule],
})
export class S3Module {}
