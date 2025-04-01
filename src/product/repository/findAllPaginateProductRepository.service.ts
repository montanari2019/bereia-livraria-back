import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FindAllPaginateProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPaginateProduct(skip: number, itemsPerPage: number) {
    return await this.prisma.product
      .findMany({
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
        skip: skip,
        take: itemsPerPage,
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error.mensage);
        throw new BadRequestException(['Error ao buscar produtos']);
      });
  }
}
