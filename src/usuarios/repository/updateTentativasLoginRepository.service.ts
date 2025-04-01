import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UpdateTentativasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateTentativas(email: string) {
    await this.prisma.usuario
      .update({
        where: {
          email,
        },
        data: {
          tentativas: {
            increment: 1,
          },
        },
      })
      .catch((error) => {
        throw new BadRequestException([
          'Erro tentativas usuario',
          error.mensage,
        ]);
      });
  }
}
