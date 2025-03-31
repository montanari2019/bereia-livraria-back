import { Injectable } from '@nestjs/common';
import { InactiveAddressInterface } from '../interfaces/inactive-adreess.interface';
import { MessageResponseDto } from 'src/@types/message-response.dto';
import { InactiveAddressRepository } from '../repository/inactiveAddressRepository.service';
import { SetTheFirstMainAddressRepository } from '../repository/setTheFirstMainAddress.service';

@Injectable()
export class InactiveAddressServices implements InactiveAddressInterface {
  constructor(
    private readonly inctivateAddressRepository: InactiveAddressRepository,
    private readonly setTheFirstMainAddressRepository: SetTheFirstMainAddressRepository,
  ) {}

  async inactivaAddress(
    id_endereco: string,
    user_id: string,
  ): Promise<MessageResponseDto> {
    // Implementa a lógica para inativar o endereço
    try {
      const response =
        await this.inctivateAddressRepository.inactiveAddress(id_endereco);

      await this.setTheFirstMainAddressRepository.setTheFirstMainAddress(
        user_id,
      );

      return response;
    } catch (e) {
      throw e;
    }
  }
}
