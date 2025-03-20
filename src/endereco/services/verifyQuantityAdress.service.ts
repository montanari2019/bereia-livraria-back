import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { VerifyQuantityAdressInterface } from '../interfaces/verify-quantity-adress.interface';

@Injectable()
export class VerifyQuantityAdressService
  implements VerifyQuantityAdressInterface
{
  constructor(private readonly prisma: PrismaService) {}
  async verifyQuantityAndAddress(id_user: string): Promise<number> {
    try {
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
    } catch (err) {
      throw err;
    }
  }
}
