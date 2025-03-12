import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteUsuarioInterface } from '../interface/delete_usuario.interface';
import { FindUniqueUserService } from './findUnique.service';

@Injectable()
export class DeleteUsuariosService implements DeleteUsuarioInterface {
  constructor(private readonly prisma: PrismaService) {}

  async deleteUser(id_user: string) {
    await this.prisma.usuario
      .delete({
        where: {
          id: id_user,
        },
      })
      .catch((error) => {
        throw new InternalServerErrorException([
          'Erro ao deletar usuario',
          error.message,
        ]);
      });

    return {
      mensage: `Usuario eliminado corretamente`,
    };
  }
}
