import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeleteProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteProduct(id_product: string): Promise<{ message: string }> {
    return await this.prisma.product
      .delete({
        where: {
          id: id_product,
        },
      })
      .then(() => {
        return {
          message: 'Product deleted successfully!',
        };
      })
      .catch((error) => {
        console.log(error.mensage);
        throw new BadRequestException(['Error ao buscar deletar produto']);
      });
  }
}
