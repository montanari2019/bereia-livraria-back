import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuariosServiceInterface } from '../interface/create_usuarios_service.interface';
import { CryptoPasswordUsuariosService } from '../services/cryptoPassword.service';
@Injectable()
export class CreateUsuariosService implements CreateUsuariosServiceInterface {
  constructor(
    private prisma: PrismaService,
    private readonly CryptoUsuariosService: CryptoPasswordUsuariosService,
  ) {}
  async createUser(createUsuarioDto: CreateUsuarioDto) {
    const { password, ...resto } = createUsuarioDto;
    var passwordCripyto: string;
    try {
      passwordCripyto =
        await this.CryptoUsuariosService.cryptoPassword(password);
    } catch (err) {
      throw err;
    }

    await this.prisma.usuario.create({
      data: {
        ...resto,
        password: passwordCripyto,
      },
    });

    return {
      message: 'Usuario criado com sucesso!',
    };
  }
}
