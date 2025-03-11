import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { EnvConfigService } from 'src/shared/infraestructure/env_config/env_config.service';
import { CryptoPassordUsuariosInterface } from '../interface/crypto_password_usuarios.interface';

@Injectable()
export class CryptoPasswordUsuariosService
  implements CryptoPassordUsuariosInterface
{
  private iv = crypto.randomBytes(16);

  constructor(private readonly EnvFileService: EnvConfigService) {}

  async cryptoPassword(password: string) {
    const cipher = crypto.createCipheriv(
      'aes-256-ccm',
      Buffer.from(this.EnvFileService.getHashPasswordEnv()),
      this.iv,
    );

    let encrypt = cipher.update(password, 'utf-8', 'hex');
    encrypt += cipher.final('hex');

    return `${this.iv.toString()}${encrypt}`;
  }
}
