import { Injectable } from '@nestjs/common';
import { CachingService } from 'src/caching/caching.service';
import {
  KEY_CACHING_ENUM,
  TIMESTAMP_CACHING,
} from 'src/caching/enum/key-caching.enum';
import { FindAllAddressesDto } from '../dto/find-all-address.dto';
import { CachingAddressInterface } from '../interfaces/caching-address.interface';

@Injectable()
export class CachingFindAllAddressService implements CachingAddressInterface {
  constructor(private readonly cacheManager: CachingService) {}

  async createCachingAddress(
    id_user: string,
    data: FindAllAddressesDto[],
  ): Promise<void> {
    const keyCache = `${id_user}_CACHE_${KEY_CACHING_ENUM.ADDRESS_USER}`;

    await this.cacheManager.setCaching(keyCache, data, TIMESTAMP_CACHING.MIN_5);

    return;
  }

  async getCachingAddress(
    id_user: string,
  ): Promise<FindAllAddressesDto[] | null> {
    const keyCache = `${id_user}_CACHE_${KEY_CACHING_ENUM.ADDRESS_USER}`;

    return this.cacheManager.getCaching<FindAllAddressesDto[]>(keyCache);
  }
}
