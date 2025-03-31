import { CreateEnderecoDto } from '../dto/create-endereco.dto';

export interface CreateEnderecoInterface {
  createEndereco: (body: CreateEnderecoDto) => Promise<{
    message: string;
  }>;
}
