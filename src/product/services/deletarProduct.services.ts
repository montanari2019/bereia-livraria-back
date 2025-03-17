import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3DeleteImagemService } from 'src/s3/services/s3DeleteImage.service';
import { FindUniqueProductService } from './findUniqueProduct.service';
import { DeleteProductInterface } from '../interfaces/delete-product.interface';

@Injectable()
export class DeleteProductService implements DeleteProductInterface {
  constructor(
    private readonly prisma: PrismaService,
    private readonly deleteImageS3Service: S3DeleteImagemService,
    private readonly findUniqueProduct: FindUniqueProductService,
  ) {}

  async deleteProduct(id_product: string): Promise<{ message: string }> {
    try {
      const product =
        await this.findUniqueProduct.fundUniqueProductById(id_product);

      await this.deleteImageS3Service.deleteFile(product.image_url);

      await this.prisma.product
        .delete({
          where: {
            id: id_product,
          },
        })
        .catch((error) => {
          console.log(error.mensage);
          throw new BadRequestException(['Error ao buscar deletar produto']);
        });

      return {
        message: 'Product deleted successfully!',
      };
    } catch (error) {
      throw error;
    }
  }
}
