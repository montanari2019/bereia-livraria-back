import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivatedAccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async activatedAccount(email: string) {
    return await this.prisma.usuario
      .update({
        where: {
          email,
        },
        data: {
          active_acount: true,
        },
      })
      .then(() => {
        return {
          message: 'Conta ativada com sucesso!',
        };
      })
      .catch((error) => {
        throw new BadRequestException(['Erro ao ativar a conta', error]);
      });
  }
}
