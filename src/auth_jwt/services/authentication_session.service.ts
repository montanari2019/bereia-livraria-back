import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { EnvConfigService } from 'src/shared/infraestructure/env_config/env_config.service';
import { CryptoPasswordUsuariosService } from 'src/usuarios/services/cryptoPassword.service';
import { FindPasswordUserService } from 'src/usuarios/services/findPasswordUser.service';
import { CreateAuthJwtDto } from '../dto/create-auth_jwt.dto';
import { AuthenticationServicesInterface } from '../interface/authentication.interface';
import { GenerateTokenService } from './generate_token.service';
import { UpdateTentativasService } from 'src/usuarios/services/updateTentativasLogin.service';
import { UpdateUsuariosService } from 'src/usuarios/services/updateUser.service';
import { ValidatorPasswordsServices } from './validatePassword.service';

@Injectable()
export class AuthenticationServices implements AuthenticationServicesInterface {
  constructor(
    private readonly FindPasswordUser: FindPasswordUserService,
    private readonly ValidatorPasswords: ValidatorPasswordsServices,
    private readonly GenerateToken: GenerateTokenService,
    private readonly EnvFile: EnvConfigService,
    private readonly UpdateUser: UpdateUsuariosService,
  ) {}

  async authenticatedLogin(
    email: string,
    passwordExterno: string,
  ): Promise<CreateAuthJwtDto> {
    const { name, password, phone_number, id, active_acount, tentativas } =
      await this.FindPasswordUser.findPasswordUser(email);

    if (!active_acount) {
      throw new ForbiddenException(['User is not active']);
    }

    if (tentativas >= 3) {
      await this.UpdateUser.blockedAccount(email);
      throw new ForbiddenException(['User exceeded maximum number of entries']);
    }

    await this.ValidatorPasswords.validatePassword(
      password,
      passwordExterno,
      email,
    );

    const payload = {
      id,
      phone_number,
      name,
      email,
    };

    const generateToken = await this.GenerateToken.generateToken(
      payload,
      this.EnvFile.getExpireLoginToken(),
    );

    return generateToken;
  }
}
