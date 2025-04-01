import { Injectable } from '@nestjs/common';
import { CachingService } from 'src/caching/caching.service';
import {
  KEY_CACHING_ENUM,
  TIMESTAMP_CACHING,
} from 'src/caching/enum/key-caching.enum';

@Injectable()
export class CachingCountProductService {
  constructor(private readonly cacheManager: CachingService) {}

  async createCachingCount(data: number): Promise<void> {
    const keyCache = KEY_CACHING_ENUM.TOTAL_COUNT_PRODUCT;

    await this.cacheManager.setCaching(
      keyCache,
      data,
      TIMESTAMP_CACHING.MIN_30,
    );

    return;
  }

  async getCachingCount(): Promise<number | null> {
    const keyCache = KEY_CACHING_ENUM.TOTAL_COUNT_PRODUCT;

    return this.cacheManager.getCaching<number>(keyCache);
  }
}
