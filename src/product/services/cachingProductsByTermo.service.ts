import { Injectable } from '@nestjs/common';
import { CachingService } from 'src/caching/caching.service';
import { TIMESTAMP_CACHING } from 'src/caching/enum/key-caching.enum';
import { ListarProdutosDto } from '../dto/listar-produtos.dto';

@Injectable()
export class CachingProductsByTermo {
  constructor(private readonly cacheManager: CachingService) {}

  async createCaching(
    data: ListarProdutosDto,
    value: string,
    page: number,
  ): Promise<void> {
    const cacheKey = `products_search_${value.toLowerCase()}_page_${page}`;

    await this.cacheManager.setCaching(
      cacheKey,
      data,
      TIMESTAMP_CACHING.MIN_10,
    );

    return;
  }

  async getCaching(
    value: string,
    page: number,
  ): Promise<ListarProdutosDto | null> {
    const cacheKey = `products_search_${value.toLowerCase()}_page_${page}`;

    return this.cacheManager.getCaching<ListarProdutosDto>(cacheKey);
  }
}
