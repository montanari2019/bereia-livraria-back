import { Injectable } from '@nestjs/common';
import { InactiveAddressInterface } from '../interfaces/inactive-adreess.interface';
import { MessageResponseDto } from 'src/@types/message-response.dto';
import { InactiveAddressRepository } from '../repository/inactiveAddressRepository.service';

@Injectable()
export class InactiveAddressServices implements InactiveAddressInterface {
  constructor(
    private readonly inctivateAddressRepository: InactiveAddressRepository,
  ) {}

  async inactivaAddress(id_endereco: string): Promise<MessageResponseDto> {
    // Implementa a lógica para inativar o endereço
    try {
      return await this.inctivateAddressRepository.inactiveAddress(id_endereco);
    } catch (e) {
      throw e;
    }
  }
}
