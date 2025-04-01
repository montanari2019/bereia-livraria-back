import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductRepositoryDto } from '../dto/create-product-repository.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CreateProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(data: CreateProductRepositoryDto) {
    return await this.prisma.product
      .create({
        data: {
          ...data,
        },
      })
      .then((data) => {
        return {
          menssage: 'Product criado com sucesso!',
          product_name: data.name,
        };
      })
      .catch((error) => {
        throw new BadRequestException(['Erro ao criar product', error.message]);
      });
  }
}
