import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuariosServiceInterface } from '../interface/create_usuarios_service.interface';
import { CryptoPasswordUsuariosService } from '../services/cryptoPassword.service';

@Injectable()
export class CreateUsuariosService implements CreateUsuariosServiceInterface {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptoPasswordService: CryptoPasswordUsuariosService,
  ) {}

  async createUser(createUsuarioDto: CreateUsuarioDto) {
    const { password, ...userData } = createUsuarioDto;

    try {
      const hashedPassword =
        await this.cryptoPasswordService.cryptoPassword(password);

      await this.validateUserEmailAndDoc(userData.doc, userData.email);

      await this.prisma.usuario
        .create({
          data: {
            ...userData,
            password: hashedPassword,
          },
        })
        .catch((error) => {
          throw new InternalServerErrorException([
            'Erro ao salvar o usuário',
            error,
          ]);
        });

      return { message: 'Usuário criado com sucesso!' };
    } catch (error) {
      throw error;
    }
  }

  async validateUserEmailAndDoc(doc_user: string, email: string) {
    try {
      const userExists = await this.prisma.usuario
        .findMany({
          where: {
            OR: [{ doc: doc_user }, { email }],
          },
        })
        .catch((error) => {
          throw new InternalServerErrorException([
            'Erro ao verificar existência do usuário',
            error,
          ]);
        });

      if (userExists.length) {
        throw new BadRequestException(['Usuário já cadastrado']);
      }

      return;
    } catch (erro) {
      throw erro;
    }
  }
}
