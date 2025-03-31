import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CryptoPasswordUsuariosService } from 'src/usuarios/services/cryptoPassword.service';
import { UpdateTentativasService } from 'src/usuarios/services/updateTentativasLogin.service';
import { ValidatorPasswordsInterface } from '../interface/validator_password.interface';

@Injectable()
export class ValidatorPasswordsServices implements ValidatorPasswordsInterface {
  constructor(
    private readonly CryptoUser: CryptoPasswordUsuariosService,
    private readonly UpdateTentativaUser: UpdateTentativasService,
  ) {}

  async validatePassword(
    passwordInterno: string,
    passwordExterno: string,
    email: string,
  ) {
    const validatePassword = await this.CryptoUser.comparePassword(
      passwordInterno,
      passwordExterno,
    );

    if (!validatePassword) {
      await this.UpdateTentativaUser.updateTentativas(email);
      throw new UnauthorizedException(['email ou senha estão incorretos']);
    }

    await this.UpdateTentativaUser.resetTentativas(email);

    return;
  }
}
