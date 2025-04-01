import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class UpdateProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateProduct(id_product: string, data: UpdateProductDto) {
    return await this.prisma.product
      .update({
        where: {
          id: id_product,
        },
        data: {
          ...data,
        },
      })
      .then(() => {
        return {
          menssage: 'Product editado com sucesso!',
        };
      })
      .catch((error) => {
        throw new InternalServerErrorException([
          'Erro ao editar product',
          error.message,
        ]);
      });
  }
}
