import { Injectable } from '@nestjs/common';
import { CachingService } from 'src/caching/caching.service';
import {
  KEY_CACHING_ENUM,
  TIMESTAMP_CACHING,
} from 'src/caching/enum/key-caching.enum';
import { ProductDto } from '../dto/product.dto';

@Injectable()
export class CachingFindFirstPageProductService {
  constructor(private readonly cacheManager: CachingService) {}

  async createCachingCount(data: ProductDto[]): Promise<void> {
    const keyCache = KEY_CACHING_ENUM.FIRST_PAGE_PRODUCT;

    await this.cacheManager.setCaching(
      keyCache,
      data,
      TIMESTAMP_CACHING.MIN_30,
    );

    return;
  }

  async getCachingCount(): Promise<ProductDto[] | null> {
    const keyCache = KEY_CACHING_ENUM.FIRST_PAGE_PRODUCT;

    return this.cacheManager.getCaching<ProductDto[]>(keyCache);
  }
}
