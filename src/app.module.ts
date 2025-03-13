import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfigModule } from '@nestjs/config';
import { AuthJwtModule } from './auth_jwt/auth_jwt.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [UsuariosModule, ConfigModule.forRoot(), AuthJwtModule, S3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
