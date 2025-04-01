import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FindUserByEmailPublicRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    return await this.prisma.usuario
      .findUnique({
        where: {
          email,
        },
        select: {
          active_acount: true,
          doc: true,
          email: true,
          name: true,
          phone_number: true,
        },
      })
      .then((user) => {
        return user;
      })
      .catch((error) => {
        throw new BadRequestException([
          'Erro ao buscar usuário',
          error.mensage,
        ]);
      });
  }
}
