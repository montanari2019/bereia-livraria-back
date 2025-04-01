import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductSearcByCategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findProductByCategory(
    termo: string,
    skip: number,
    itemsPerPage: number,
  ) {
    return await this.prisma.product
      .findMany({
        where: {
          OR: [{ category: { contains: termo, mode: 'insensitive' } }],
        },
        select: {
          id: true,
          name: true,
          price: true,
          available: true,
          category: true,
          description: true,
          image_url: true,
          stock: true,
        },
        skip,
        take: itemsPerPage,
        orderBy: {
          name: 'asc', // Ordenação alfabética por nome
        },
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error.mensage);
        throw new BadRequestException([
          'Error ao buscar produtos por categoria',
        ]);
      });
  }
}
