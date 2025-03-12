import { CreateAuthJwtDto } from '../dto/create-auth_jwt.dto';

export interface AuthenticationServicesInterface {
  // validateToken: (token: string) => Promise<boolean>;

  authenticatedLogin: (
    email: string,
    password: string,
  ) => Promise<CreateAuthJwtDto>;
  validatePassword: (
    passwordInterno: string,
    passwordExterno: string,
  ) => Promise<void>;
}
