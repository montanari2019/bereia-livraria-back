import { Request } from 'express';
import { PayloadUserValidate } from '../dto/payload_user_validate.dto';

export interface CustomAuthRequest extends Request {
  payload: PayloadUserValidate;
}
