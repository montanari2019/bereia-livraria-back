import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CountProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async count() {
    return await this.prisma.product.count();
  }

  async countByCategory(category: string) {
    return await this.prisma.product
      .count({
        where: {
          OR: [{ category: { contains: category, mode: 'insensitive' } }],
        },
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error.mensage);
        throw new BadRequestException([
          'Error ao contar produtos por categoria',
        ]);
      });
  }

  async countByTermo(value: string) {
    return await this.prisma.product
      .count({
        where: {
          OR: [
            { name: { contains: value, mode: 'insensitive' } },
            { description: { contains: value, mode: 'insensitive' } },
          ],
        },
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error.mensage);
        throw new BadRequestException(['Error ao contar produtos por termo']);
      });
  }
}
