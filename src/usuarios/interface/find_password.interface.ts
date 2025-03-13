import { UserTokenDto } from '../dto/return_user_token.dto';

export interface FindPasswordUserInterface {
  findPasswordUser: (email: string) => Promise<UserTokenDto>;
}
