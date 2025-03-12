import { UpdateUsuarioDto } from '../dto/update-usuario.dto';

export interface UpdateUsuariosServiceInterface {
  updateUser: (
    user: UpdateUsuarioDto,
    user_id: string,
  ) => Promise<{
    message: string;
  }>;
}
