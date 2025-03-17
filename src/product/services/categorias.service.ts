import { Injectable } from '@nestjs/common';
import { CachingService } from 'src/caching/caching.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriaProductsInterface } from '../interfaces/categoria-produtc.interface';
import {
  KEY_CACHING_ENUM,
  TIMESTAMP_CACHING,
} from 'src/caching/enum/key-caching.enum';

@Injectable()
export class CategoriasService implements CategoriaProductsInterface {
  private cacheKey = KEY_CACHING_ENUM.CATEGORIA_PRODUCT;
  private cacheTTL = TIMESTAMP_CACHING.MIN_30;

  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheManager: CachingService,
  ) {}
  async ListarCategorias(): Promise<{ categorias: string[] }> {
    const cachedData = await this.cacheManager.getCaching<{
      categorias: string[];
    }>(this.cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const categoria = await this.prisma.product
      .findMany({
        select: {
          category: true,
        },
        distinct: ['category'],
      })
      .then((res) => {
        return { categorias: res.map((c) => c.category) };
      });

    await this.cacheManager.setCaching(this.cacheKey, categoria, this.cacheTTL);

    return categoria;
  }
}
