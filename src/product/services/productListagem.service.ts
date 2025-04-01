import { Injectable } from '@nestjs/common';
import { EnvConfigService } from 'src/shared/infraestructure/env_config/env_config.service';
import { ListarProdutosDto } from '../dto/listar-produtos.dto';
import { ProductDto } from '../dto/product.dto';
import { ProductLisatagemInterface } from '../interfaces/product-list.interface';
import { CountProductRepository } from '../repository/countProductRepository.service';
import { FindAllPaginateProductRepository } from '../repository/findAllPaginateProductRepository.service';
import { FindAllTheFirstPageProductRepostory } from '../repository/findAllTheFirstPageProductRepostory.service';
import { CachingCountProductService } from './cachingCountProduct.service';
import { CachingFindFirstPageProductService } from './cachingFindFirstPageProduct.service';

@Injectable()
export class ProductListagemService implements ProductLisatagemInterface {
  constructor(
    private readonly cacheCountProductManager: CachingCountProductService,
    private readonly cacheFindFirstPagerProductManager: CachingFindFirstPageProductService,
    private readonly envConfig: EnvConfigService,
    private readonly findAllPagianteRepository: FindAllPaginateProductRepository,
    private readonly findAllTheFirstPageRepository: FindAllTheFirstPageProductRepostory,
    private readonly countProductRepository: CountProductRepository,
  ) {}
  async listarProduct(page: number): Promise<ListarProdutosDto> {
    try {
      const itemsPerPage = this.envConfig.getItensPerPage();
      const cachedTotalCountData = await this.countProducts();
      const totalPages = Math.ceil(cachedTotalCountData / itemsPerPage);
      const skip = (page - 1) * itemsPerPage;

      if (page === 1) {
        return {
          totalPages: totalPages,
          product: await this.listarPrimeiraPaginaProdutos(),
        };
      }

      const product =
        await this.findAllPagianteRepository.findAllPaginateProduct(
          skip,
          itemsPerPage,
        );

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
      var cachedTotalCountData =
        await this.cacheCountProductManager.getCachingCount();

      if (cachedTotalCountData) {
        return cachedTotalCountData;
      }

      cachedTotalCountData = await this.countProductRepository.count();

      await this.cacheCountProductManager.createCachingCount(
        cachedTotalCountData,
      );

      return cachedTotalCountData;
    } catch (error) {
      throw error;
    }
  }

  async listarPrimeiraPaginaProdutos(): Promise<ProductDto[]> {
    try {
      const cachedFirstPage =
        await this.cacheFindFirstPagerProductManager.getCachingCount();

      if (cachedFirstPage) {
        return cachedFirstPage;
      }

      const products =
        await this.findAllTheFirstPageRepository.findAllTheFirstPage();

      await this.cacheFindFirstPagerProductManager.createCachingCount(products);

      return products;
    } catch (error) {
      throw error;
    }
  }
}
