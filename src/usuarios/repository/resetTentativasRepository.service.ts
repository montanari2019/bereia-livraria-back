import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ResetTentativasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async reset(email: string) {
    await this.prisma.usuario
      .update({
        where: {
          email,
        },
        data: {
          tentativas: 0,
        },
      })
      .catch((error) => {
        throw new BadRequestException([
          'Erro reset tentativas usuario',
          error.mensage,
        ]);
      });
  }
}
