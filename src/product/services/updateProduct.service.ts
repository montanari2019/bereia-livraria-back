import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3DeleteImagemService } from 'src/s3/services/s3DeleteImage.service';
import { S3UploadImagemService } from 'src/s3/services/s3UploadImage.service';
import { UpdateProductDto } from '../dto/update-product.dto';
import { UpdateProductInterface } from '../interfaces/update-product.interface';
import { FindUniqueProductService } from './findUniqueProduct.service';
import { UpdateProductRepository } from '../repository/updateProductRepository.service';
import { UpdateProductFileRepository } from '../repository/updateProductFileRepository.service';

@Injectable()
export class UpdateProductService implements UpdateProductInterface {
  constructor(
    private readonly uploadImage: S3UploadImagemService,
    private readonly deleteImage: S3DeleteImagemService,
    private readonly findUniqueProductService: FindUniqueProductService,
    private readonly updateProductRepository: UpdateProductRepository,
    private readonly updateProductFileRepository: UpdateProductFileRepository,
  ) {}
  async updateProduct(
    id_product: string,
    body: UpdateProductDto,
  ): Promise<any> {
    await this.findUniqueProductService.fundUniqueProductById(id_product);

    try {
      return await this.updateProductRepository.updateProduct(id_product, body);
    } catch (error) {
      throw error;
    }
  }

  async updateImageProductFile(file: Express.Multer.File, id_product: string) {
    try {
      const data =
        await this.findUniqueProductService.fundUniqueProductById(id_product);
      const { urlFile } = await this.uploadImage.uploadFile(file);

      await this.updateProductFileRepository.updateProduct(id_product, urlFile);

      await this.deleteImage.deleteFile(data.image_url);

      return {
        menssage: `Image do produto ${data.name} foi alterada com sucesso`,
        urlFile: urlFile,
      };
    } catch (error) {
      throw error;
    }
  }
}
