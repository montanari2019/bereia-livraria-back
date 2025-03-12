import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EnvConfigService } from 'src/shared/infraestructure/env_config/env_config.service';
import { CryptoPasswordUsuariosService } from 'src/usuarios/services/cryptoPassword.service';
import { FindPasswordUserService } from 'src/usuarios/services/findPasswordUser.service';
import { CreateAuthJwtDto } from '../dto/create-auth_jwt.dto';
import { AuthenticationServicesInterface } from '../interface/authentication.interface';
import { GenerateTokenService } from './generate_token.service';

@Injectable()
export class AuthenticationServices implements AuthenticationServicesInterface {
  constructor(
    private readonly FindPasswordUser: FindPasswordUserService,
    private readonly CryptoUser: CryptoPasswordUsuariosService,
    private readonly GenerateToken: GenerateTokenService,
    private readonly EnvFile: EnvConfigService,
  ) {}

  async authenticatedLogin(
    email: string,
    password: string,
  ): Promise<CreateAuthJwtDto> {
    const passwordInterno = await this.FindPasswordUser.findPasswordUser(email);
    await this.validatePassword(passwordInterno, password);

    const payload = {
      email,
    };

    const generateToken = await this.GenerateToken.generateToken(
      payload,
      this.EnvFile.getExpireLoginToken(),
    );

    return generateToken;
  }

  async validatePassword(passwordInterno: string, passwordExterno: string) {
    const validatePassword = await this.CryptoUser.comparePassword(
      passwordInterno,
      passwordExterno,
    );

    if (!validatePassword) {
      throw new UnauthorizedException(['email ou senha estão incorretos']);
    }

    return;
  }
}
