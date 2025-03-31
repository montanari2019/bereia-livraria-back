import { MessageResponseDto } from 'src/@types/message-response.dto';

export interface InactiveAddressInterface {
  inactivaAddress: (
    id_endereco: string,
    user_id: string,
  ) => Promise<MessageResponseDto>;
}
