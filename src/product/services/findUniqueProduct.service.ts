import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindUniqueProductDto } from '../dto/find-unique-producto.dto';
import { FindUniqueByIdProductInterface } from '../interfaces/find-unique-product.interface';
import { FindUniqueProductRepository } from '../repository/findUniqueRepository.service';

@Injectable()
export class FindUniqueProductService
  implements FindUniqueByIdProductInterface
{
  constructor(
    private readonly findUniqueProductRepository: FindUniqueProductRepository,
  ) {}

  async fundUniqueProductById(
    id_product: string,
  ): Promise<FindUniqueProductDto> {
    try {
      const product =
        await this.findUniqueProductRepository.findUniqueById(id_product);

      if (product === null) {
        throw new NotFoundException(['Product not found']);
      }

      return product;
    } catch (error) {
      throw error;
    }
  }
}
