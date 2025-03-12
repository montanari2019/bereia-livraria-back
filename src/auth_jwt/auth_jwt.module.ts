import { Module } from '@nestjs/common';
import { AuthJwtService } from './auth_jwt.service';
import { AuthJwtController } from './auth_jwt.controller';
import { PrismModule } from 'src/prisma/prisma.module';
import { EnvConfigModule } from 'src/shared/infraestructure/env_config/env-config.module';
import { AuthenticationServices } from './services/authentication_session.service';
import { CryptoPasswordUsuariosService } from 'src/usuarios/services/cryptoPassword.service';
import { FindPasswordUserService } from 'src/usuarios/services/findPasswordUser.service';
import { JwtModule } from '@nestjs/jwt';
import { GenerateTokenService } from './services/generate_token.service';
import { ValidateTokenServices } from './services/validate_token.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthJwtController],
  providers: [
    AuthJwtService,
    AuthenticationServices,
    CryptoPasswordUsuariosService,
    FindPasswordUserService,
    GenerateTokenService,
    ValidateTokenServices,
  ],
  imports: [PrismModule, ConfigModule.forRoot(), EnvConfigModule, JwtModule],
  //
  exports: [AuthJwtService],
})
export class AuthJwtModule {}
