import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EnvConfigModule } from 'src/shared/infraestructure/env_config/env-config.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { AuthJwtController } from './auth_jwt.controller';
import { AuthenticationServices } from './services/authentication_session.service';
import { GenerateTokenService } from './services/generate_token.service';
import { ValidateTokenServices } from './services/validate_token.service';
import { ValidatorPasswordsServices } from './services/validatePassword.service';

@Module({
  controllers: [AuthJwtController],
  providers: [
    AuthenticationServices,
    GenerateTokenService,
    ValidateTokenServices,
    ValidatorPasswordsServices,
  ],
  imports: [PrismaModule, UsuariosModule, EnvConfigModule, JwtModule],
  exports: [
    AuthenticationServices,
    GenerateTokenService,
    ValidateTokenServices,
    ValidatorPasswordsServices,
  ],
})
export class AuthJwtModule {}
