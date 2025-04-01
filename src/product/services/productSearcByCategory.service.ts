import { Injectable } from '@nestjs/common';
import { EnvConfigService } from 'src/shared/infraestructure/env_config/env_config.service';
import { ListarProdutosDto } from '../dto/listar-produtos.dto';
import { ProductSearchByCategoryInterface } from '../interfaces/product-search-category.interface';
import { CountProductRepository } from '../repository/countProductRepository.service';
import { ProductSearcByCategoryRepository } from '../repository/productSearcByCategoryRepository.service';
import { CachingProductsByCategory } from './cachingProductsByCategory.service';

@Injectable()
export class ProductSearchByCategoryService
  implements ProductSearchByCategoryInterface
{
  constructor(
    private readonly countProductRepository: CountProductRepository,
    private readonly envConfig: EnvConfigService,
    private readonly searcByCategoryRepository: ProductSearcByCategoryRepository,
    private readonly cachingProductsByCategory: CachingProductsByCategory,
  ) {}
  async searchProductsByCategory(
    value: string,
    page: number,
  ): Promise<ListarProdutosDto> {
    try {
      console.time('listarProductByCategoria');
      const itemsPerPage = this.envConfig.getItensPerPage();

      const skip = (page - 1) * itemsPerPage;

      let cachedProducts =
        await this.cachingProductsByCategory.getCaching(value);

      if (!cachedProducts) {
        const totalCount =
          await this.countProductRepository.countByCategory(value);

        const totalPages = Math.ceil(totalCount / itemsPerPage);

        const products =
          await this.searcByCategoryRepository.findProductByCategory(
            value,
            skip,
            itemsPerPage,
          );

        cachedProducts = {
          totalPages,
          product: products,
        };

        await this.cachingProductsByCategory.createCaching(
          cachedProducts,
          value,
        );
      } else {
        console.log('Cache hit: retornando do cache');
      }

      console.timeEnd('listarProductByCategoria');

      return cachedProducts;
    } catch (error) {
      throw error;
    }
  }
}
