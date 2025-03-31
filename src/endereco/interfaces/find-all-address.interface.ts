import { FindAllAddressesDto } from '../dto/find-all-address.dto';

export interface FindAllAddressInterface {
  findAllAddresses: (id_user: string) => Promise<FindAllAddressesDto[]>;
}
