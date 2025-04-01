import { Injectable } from '@nestjs/common';
import { S3UploadImagemService } from 'src/s3/services/s3UploadImage.service';
import { CreateProductRepositoryDto } from '../dto/create-product-repository.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { CreateProductInterface } from '../interfaces/create-product.interface';
import { CreateProductRepository } from '../repository/createProductRepository.service';

@Injectable()
export class CreateProductService implements CreateProductInterface {
  constructor(
    private readonly createProductRepository: CreateProductRepository,
    private readonly UploadFileService: S3UploadImagemService,
  ) {}
  async createProduct(
    body: CreateProductDto,
    file: Express.Multer.File,
    user_id: string,
  ): Promise<any> {
    const { category, description, name, price } = body;

    try {
      const { urlFile } = await this.UploadFileService.uploadFile(file);

      const object: CreateProductRepositoryDto = {
        category,
        description,
        name,
        price: Number(price),
        image_url: urlFile,
        user_create_id: user_id,
      };

      return await this.createProductRepository.createProduct(object);
    } catch (error) {
      throw error;
    }
  }
}
