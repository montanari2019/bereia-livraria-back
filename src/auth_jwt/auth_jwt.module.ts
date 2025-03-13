import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismModule } from 'src/prisma/prisma.module';
import { EnvConfigModule } from 'src/shared/infraestructure/env_config/env-config.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { AuthJwtController } from './auth_jwt.controller';
import { AuthJwtService } from './auth_jwt.service';
import { AuthenticationServices } from './services/authentication_session.service';
import { GenerateTokenService } from './services/generate_token.service';
import { ValidateTokenServices } from './services/validate_token.service';
import { ValidatorPasswordsServices } from './services/validatePassword.service';

@Module({
  controllers: [AuthJwtController],
  providers: [
    AuthJwtService,
    AuthenticationServices,
    GenerateTokenService,
    ValidateTokenServices,
    ValidatorPasswordsServices,
  ],
  imports: [
    PrismModule,
    UsuariosModule,
    ConfigModule.forRoot(),
    EnvConfigModule,
    JwtModule.register({
      secret: process.env.JWT_LOGIN_HASH,
      signOptions: { expiresIn: process.env.EXPIRE_LOGIN_TOKEN },
    }),
  ],
  //
  exports: [AuthJwtService],
})
export class AuthJwtModule {}
