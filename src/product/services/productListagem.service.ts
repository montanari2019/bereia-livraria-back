import { BadRequestException, Injectable } from '@nestjs/common';
import { CachingService } from 'src/caching/caching.service';
import {
  KEY_CACHING_ENUM,
  TIMESTAMP_CACHING,
} from 'src/caching/enum/key-caching.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnvConfigService } from 'src/shared/infraestructure/env_config/env_config.service';
import { ListarProdutosDto } from '../dto/listar-produtos.dto';
import { ProductDto } from '../dto/product.dto';
import { ProductLisatagemInterface } from '../interfaces/product-list.interface';

@Injectable()
export class ProductListagemService implements ProductLisatagemInterface {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheManager: CachingService,
    private readonly envConfig: EnvConfigService,
  ) {}
  async listarProduct(page: number): Promise<ListarProdutosDto> {
    try {
      const itemsPerPage = this.envConfig.getItensPerPage();

      const cachedTotalCountData = await this.countProducts();
      const totalPages = Math.ceil(cachedTotalCountData / itemsPerPage);
      const skip = (page - 1) * itemsPerPage;

      if (page === 1) {
        console.timeEnd('listarProduct');
        return {
          totalPages: totalPages,
          product: await this.listarPrimeiraPaginaProdutos(),
        };
      }

      const product = await this.prisma.product
        .findMany({
          select: {
            id: true,
            name: true,
            price: true,
            available: true,
            category: true,
            description: true,
            image_url: true,
            stock: true,
          },
          skip: skip,
          take: itemsPerPage,
        })
        .catch((error) => {
          console.log(error.mensage);
          throw new BadRequestException(['Error ao buscar produtos']);
        });

      return {
        totalPages,
        product,
      };
    } catch (error) {
      throw error;
    }
  }

  async countProducts() {
    try {
      var cachedTotalCountData = await this.cacheManager.getCaching<number>(
        KEY_CACHING_ENUM.TOTAL_COUNT_PRODUCT,
      );

      if (cachedTotalCountData) {
        return cachedTotalCountData;
      }

      cachedTotalCountData = await this.prisma.product.count();
      await this.cacheManager.setCaching(
        KEY_CACHING_ENUM.TOTAL_COUNT_PRODUCT,
        cachedTotalCountData,
        TIMESTAMP_CACHING.MIN_30,
      );

      return cachedTotalCountData;
    } catch (error) {
      throw error;
    }
  }

  async listarPrimeiraPaginaProdutos(): Promise<ProductDto[]> {
    try {
      const cachedFirstPage = await this.cacheManager.getCaching<ProductDto[]>(
        KEY_CACHING_ENUM.FIRST_PAGE_PRODUCT,
      );

      if (cachedFirstPage) {
        return cachedFirstPage;
      }
      const products = await this.prisma.product
        .findMany({
          select: {
            id: true,
            name: true,
            price: true,
            available: true,
            category: true,
            description: true,
            image_url: true,
            stock: true,
          },
          skip: 0,
          take: this.envConfig.getItensPerPage(),
          orderBy: {
            name: 'asc',
          },
        })
        .catch((error) => {
          console.log(error.mensage);
          throw new BadRequestException([
            'Error ao buscar primeira pagina de produtos',
          ]);
        });

      await this.cacheManager.setCaching(
        KEY_CACHING_ENUM.FIRST_PAGE_PRODUCT,
        products,
        TIMESTAMP_CACHING.MIN_30,
      );

      return products;
    } catch (error) {
      throw error;
    }
  }
}
