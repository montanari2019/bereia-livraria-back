import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { VerifyQuantityAdressInterface } from '../interfaces/verify-quantity-adress.interface';

@Injectable()
export class VerifyQuantityAdressRepository
  implements VerifyQuantityAdressInterface
{
  constructor(private readonly prisma: PrismaService) {}
  async verifyQuantityAndAddress(id_user: string): Promise<number> {
    const count = await this.prisma.endereco
      .count({
        where: {
          usuario_id: id_user,
        },
      })
      .catch((error) => {
        throw new BadRequestException([
          'Error ao contar endereços',
          error.message,
        ]);
      });

    return count;
  }
}
