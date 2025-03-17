import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CachingInterface } from './interface/caching.interface';

@Injectable()
export class CachingService implements CachingInterface {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getCaching<T>(key: string): Promise<T | null> {
    return this.cacheManager.get<T>(key);
  }

  async setCaching<T>(key: string, value: T, ttl: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  async clearCaching(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
}
