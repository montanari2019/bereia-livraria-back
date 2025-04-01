import { Injectable } from '@nestjs/common';
import { CachingService } from 'src/caching/caching.service';
import {
  KEY_CACHING_ENUM,
  TIMESTAMP_CACHING,
} from 'src/caching/enum/key-caching.enum';

@Injectable()
export class CachingCategoriasService {
  constructor(private readonly cacheManager: CachingService) {}

  async createCachingCategory(data: { categorias: string[] }): Promise<void> {
    const keyCache = `CACHE_${KEY_CACHING_ENUM.CATEGORIA_PRODUCT}`;

    await this.cacheManager.setCaching(
      keyCache,
      data,
      TIMESTAMP_CACHING.HOUR_1,
    );

    return;
  }

  async getCachingCategorias(): Promise<{
    categorias: string[];
  } | null> {
    const keyCache = `CACHE_${KEY_CACHING_ENUM.CATEGORIA_PRODUCT}`;

    return this.cacheManager.getCaching<{ categorias: string[] }>(keyCache);
  }
}
