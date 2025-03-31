import { FindAllAddressesDto } from '../dto/find-all-address.dto';

export interface CachingAddressInterface {
  createCachingAddress(
    id_user: string,
    data: FindAllAddressesDto[],
  ): Promise<void>;
  getCachingAddress(id_user: string): Promise<FindAllAddressesDto[] | null>;
}
