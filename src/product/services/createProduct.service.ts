import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductInterface } from '../interfaces/create-product.interface';
import { CreateProductDto } from '../dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3UploadImagemService } from 'src/s3/services/s3UploadImage.service';

@Injectable()
export class CreateProductService implements CreateProductInterface {
  constructor(
    private readonly Prisma: PrismaService,
    private readonly UploadFileService: S3UploadImagemService,
  ) {}
  async createProduct(
    body: CreateProductDto,
    file: Express.Multer.File,
  ): Promise<any> {
    const { category, description, name, price } = body;

    try {
      const { urlFile } = await this.UploadFileService.uploadFile(file);

      return await this.Prisma.product
        .create({
          data: {
            category,
            description,
            name,
            price: Number(price),
            image_url: urlFile,
          },
        })
        .then(() => {
          return {
            menssage: 'Product criado com sucesso!',
            product_name: name,
          };
        })
        .catch((error) => {
          throw new InternalServerErrorException([
            'Erro ao criar product',
            error.message,
          ]);
        });
    } catch (error) {
      throw error;
    }
  }
}
