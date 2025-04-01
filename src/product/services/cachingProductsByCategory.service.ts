import { Injectable } from '@nestjs/common';
import { CachingService } from 'src/caching/caching.service';
import { ListarProdutosDto } from '../dto/listar-produtos.dto';
import {
  KEY_CACHING_ENUM,
  TIMESTAMP_CACHING,
} from 'src/caching/enum/key-caching.enum';

@Injectable()
export class CachingProductsByCategory {
  constructor(private readonly cacheManager: CachingService) {}

  async createCaching(data: ListarProdutosDto, value: string): Promise<void> {
    const cacheKey = `${KEY_CACHING_ENUM.SEARCH_PRODUCT_CATEGORY}_${value.toUpperCase()}`;

    await this.cacheManager.setCaching(
      cacheKey,
      data,
      TIMESTAMP_CACHING.MIN_10,
    );

    return;
  }

  async getCaching(value: string): Promise<ListarProdutosDto | null> {
    const cacheKey = `${KEY_CACHING_ENUM.SEARCH_PRODUCT_CATEGORY}_${value.toUpperCase()}`;

    return this.cacheManager.getCaching<ListarProdutosDto>(cacheKey);
  }
}
