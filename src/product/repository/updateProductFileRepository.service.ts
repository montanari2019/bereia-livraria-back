import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UpdateProductFileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateProduct(id_product: string, fileUrl: string) {
    return await this.prisma.product
      .update({
        where: {
          id: id_product,
        },
        data: {
          image_url: fileUrl,
        },
      })
      .then(() => {
        return {
          menssage: 'Product editado com sucesso!',
        };
      })
      .catch((error) => {
        throw new InternalServerErrorException([
          'Error ao alterar imagem do produto',
          error.message,
        ]);
      });
  }
}
