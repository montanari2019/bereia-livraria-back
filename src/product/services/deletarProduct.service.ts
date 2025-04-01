import { Injectable } from '@nestjs/common';
import { S3DeleteImagemService } from 'src/s3/services/s3DeleteImage.service';
import { DeleteProductInterface } from '../interfaces/delete-product.interface';
import { DeleteProductRepository } from '../repository/deleteProductRepository.service';
import { FindUniqueProductService } from './findUniqueProduct.service';

@Injectable()
export class DeleteProductService implements DeleteProductInterface {
  constructor(
    private readonly deleteProductRepository: DeleteProductRepository,
    private readonly deleteImageS3Service: S3DeleteImagemService,
    private readonly findUniqueProduct: FindUniqueProductService,
  ) {}

  async deleteProduct(id_product: string): Promise<{ message: string }> {
    try {
      const product =
        await this.findUniqueProduct.fundUniqueProductById(id_product);

      await this.deleteImageS3Service.deleteFile(product.image_url);

      return await this.deleteProductRepository.deleteProduct(id_product);
    } catch (error) {
      throw error;
    }
  }
}
