import { CreateEnderecoDto } from '../dto/create-endereco.dto';

export interface CreateEnderecoInterface {
  createEndereco: (
    body: CreateEnderecoDto,
    user_id: string,
  ) => Promise<{
    message: string;
  }>;
}
