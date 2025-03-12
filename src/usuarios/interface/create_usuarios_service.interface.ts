import { CreateUsuarioDto } from '../dto/create-usuario.dto';

export interface CreateUsuariosServiceInterface {
  createUser: (user: CreateUsuarioDto) => Promise<{
    message: string;
  }>;
}
