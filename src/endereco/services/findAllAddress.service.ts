import { Injectable } from '@nestjs/common';
import { FindAllAddressInterface } from '../interfaces/find-all-address.interface';
import { FindAllAddressesDto } from '../dto/find-all-address.dto';
import { FindAllActiveAddressRepository } from '../repository/findAllAddressRepository.service';
import { CachingFindAllAddressService } from './cachingAddress.service';

@Injectable()
export class FindAllActiveAddressService implements FindAllAddressInterface {
  constructor(
    private readonly findAllAddresseRepository: FindAllActiveAddressRepository,
    private readonly cachingAddressService: CachingFindAllAddressService,
  ) {}
  async findAllAddresses(id_user: string): Promise<FindAllAddressesDto[]> {
    try {
      const cacheAddress =
        await this.cachingAddressService.getCachingAddress(id_user);

      if (cacheAddress) {
        return cacheAddress;
      }

      return await this.findAllAddresseRepository.findAllAddresses(id_user);
    } catch (error) {
      throw error;
    }
  }
}
