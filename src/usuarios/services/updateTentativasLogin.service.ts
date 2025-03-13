import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTentativasLogin } from '../interface/update_tentativas_login';

@Injectable()
export class UpdateTentativasService implements UpdateTentativasLogin {
  constructor(private readonly Prisma: PrismaService) {}
  async resetTentativas(email: string): Promise<void> {
    await this.Prisma.usuario
      .update({
        where: {
          email,
        },
        data: {
          tentativas: 0,
        },
      })
      .catch((error) => {
        throw new InternalServerErrorException([
          'Erro reset tentativas usuario',
          error.mensage,
        ]);
      });
  }

  async updateTentativas(email: string): Promise<void> {
    try {
      const user = await this.Prisma.usuario
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
          throw new InternalServerErrorException([
            'Erro tentativas usuario',
            error.mensage,
          ]);
        });

      if (user === null) {
        throw new NotFoundException(['User not found']);
      }

      return;
    } catch (error) {
      throw error;
    }
  }
}
