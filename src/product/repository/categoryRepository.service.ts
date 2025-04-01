import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findCategory(): Promise<{
    categorias: string[];
  }> {
    const categoria = await this.prisma.product
      .findMany({
        select: {
          category: true,
        },
        distinct: ['category'],
      })
      .then((res) => {
        return { categorias: res.map((c) => c.category) };
      })
      .catch((error) => {
        console.log(error.mensage);
        throw new BadRequestException([
          'Error ao buscar categoria dos produtos ',
        ]);
      });

    return categoria;
  }
}
