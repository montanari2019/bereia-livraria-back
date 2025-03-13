import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { EnvConfigService } from 'src/shared/infraestructure/env_config/env_config.service';
import { CryptoPassordUsuariosInterface } from '../interface/crypto_password_usuarios.interface';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CryptoPasswordUsuariosService
  implements CryptoPassordUsuariosInterface
{
  constructor(private readonly EnvService: EnvConfigService) {}

  async cryptoPassword(password: string) {
    try {
      const saltOrRounds = this.EnvService.getHashPasswordEnv();
      const hash = await bcrypt.hash(password, saltOrRounds);
      return hash;
    } catch (error) {
      throw new Error(error);
    }
  }

  async comparePassword(passwordInterno: string, passwordExterno: string) {
    const isMatch = await bcrypt.compare(passwordExterno, passwordInterno);
    return isMatch;
  }
}
