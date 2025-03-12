import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfigModule } from '@nestjs/config';
import { AuthJwtModule } from './auth_jwt/auth_jwt.module';

@Module({
  imports: [UsuariosModule, ConfigModule.forRoot(), AuthJwtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
