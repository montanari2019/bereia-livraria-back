import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindUniqueProductDto } from '../dto/find-unique-producto.dto';
import { FindUniqueByIdProductInterface } from '../interfaces/find-unique-product.interface';

@Injectable()
export class FindUniqueProductService
  implements FindUniqueByIdProductInterface
{
  constructor(private readonly Prisma: PrismaService) {}

  async fundUniqueProductById(
    id_product: string,
  ): Promise<FindUniqueProductDto> {
    try {
      const product = await this.Prisma.product.findUnique({
        where: {
          id: id_product,
        },
      });

      if (product === null) {
        throw new NotFoundException(['Product not found']);
      }

      return product;
    } catch (error) {
      throw error;
    }
  }
}
