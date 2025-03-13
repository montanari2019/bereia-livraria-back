import { PayloadUserValidate } from '../dto/payload_user_validate.dto';

export interface ValidateTokenInterface {
  validateToken(token: string): Promise<PayloadUserValidate>;
}
