import { UsuarioPublicDto } from '../dto/public-usuario.dto';

export interface FindUniqueUserInterface {
  findUniqueUser: (email: string) => Promise<UsuarioPublicDto | null>;
}
