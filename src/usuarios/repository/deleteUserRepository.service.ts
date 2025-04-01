import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeleteUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteUser(id_user: string) {
    return await this.prisma.usuario
      .delete({
        where: {
          id: id_user,
        },
      })
      .then(() => {
        return {
          mensage: `Usuario eliminado corretamente`,
        };
      })
      .catch((error) => {
        throw new BadRequestException([
          'Erro ao deletar usuario',
          error.message,
        ]);
      });
  }
}
