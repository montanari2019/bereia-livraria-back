import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUsuariosServiceInterface } from '../interface/update_usuarios_service.interface';
import { UsuarioPublicDto } from '../dto/public-usuario.dto';
@Injectable()
export class UpdateUsuariosService implements UpdateUsuariosServiceInterface {
  constructor(private prisma: PrismaService) {}
  async updateUser(updateUser: UsuarioPublicDto, user_id: string) {
    try {
      await this.findUserUpdate(user_id);

      await this.prisma.usuario
        .update({
          where: { id: user_id },
          data: {
            doc: updateUser.doc,
            email: updateUser.email,
            name: updateUser.name,
            phone_number: updateUser.phone_number,
          },
        })
        .catch((error) => {
          throw new InternalServerErrorException([
            'Erro ao alterar o usuário',
            error,
          ]);
        });

      return { message: 'Usuário alterado com sucesso!' };
    } catch (error) {
      throw error;
    }
  }

  async findUserUpdate(id_user: string) {
    const user = await this.prisma.usuario
      .findUnique({
        where: { id: id_user },
      })
      .catch((error) => {
        throw new InternalServerErrorException([
          'Erro ao procurar o usuário',
          error,
        ]);
      });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
  }

  async activatedAccount(tokenActive: string) {}
}
