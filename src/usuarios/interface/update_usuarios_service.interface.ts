import { UsuarioPublicDto } from '../dto/public-usuario.dto';

export interface UpdateUsuariosServiceInterface {
  updateUser: (
    user: UsuarioPublicDto,
    user_id: string,
  ) => Promise<{
    message: string;
  }>;

  findUserUpdate: (id_user: string) => Promise<void>;

  activatedAccount: (tokenActive: string) => Promise<void>;
  blockedAccount: (email: string) => Promise<void>;
}
