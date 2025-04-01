import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FindUserByEmailPrivateRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    return await this.prisma.usuario
      .findUnique({
        where: {
          email,
        },
        select: {
          password: true,
          id: true,
          email: true,
          name: true,
          phone_number: true,
          tentativas: true,
          active_acount: true,
        },
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new BadRequestException([
          'Erro ao buscar usuário 95',
          error.mensage,
        ]);
      });
  }
}
