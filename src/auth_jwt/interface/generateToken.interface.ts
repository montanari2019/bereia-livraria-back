import { CreateAuthJwtDto } from '../dto/create-auth_jwt.dto';

export interface GenerateTokenInterface {
  generateToken: (payload: any, exp: string) => Promise<CreateAuthJwtDto>;
}
