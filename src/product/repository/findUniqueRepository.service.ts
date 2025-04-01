import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FindUniqueProductRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findUniqueById(id_product: string) {
    return await this.prisma.product
      .findUnique({
        where: {
          id: id_product,
        },
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error.mensage);
        throw new BadRequestException(['Error ao buscar produto']);
      });
  }
}
