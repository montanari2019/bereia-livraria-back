import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BlockedUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async blockedAccount(email: string): Promise<void> {
    await this.prisma.usuario
      .update({
        where: { email },
        data: {
          active_acount: false,
        },
      })
      .then(() => {
        return {
          message: 'Usuário bloqueado com sucesso',
        };
      })
      .catch((error) => {
        throw new BadRequestException(['Erro ao bloquear o usuário', error]);
      });

    return;
  }
}
