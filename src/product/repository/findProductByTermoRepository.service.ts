import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FindProductByTermoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findProductByTermo(value: string, skip: number, itemsPerPage: number) {
    return await this.prisma.product
      .findMany({
        where: {
          OR: [
            { name: { contains: value, mode: 'insensitive' } },
            { description: { contains: value, mode: 'insensitive' } },
          ],
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
        throw new BadRequestException(['Error ao buscar produtos por termo']);
      });
  }
}
