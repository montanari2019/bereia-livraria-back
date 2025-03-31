import { UpdateEnderecoDto } from '../dto/update-endereco.dto';

export interface UpdateAddressInterface {
  updateAddress: (
    id_endereco: string,
    data: UpdateEnderecoDto,
  ) => Promise<{ message: string }>;
}
