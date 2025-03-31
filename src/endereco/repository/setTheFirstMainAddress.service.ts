import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllAnyAddressRepository } from './FindAllAnyAddressRepository.service';

@Injectable()
export class SetTheFirstMainAddressRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findAllAnyAddressRepository: FindAllAnyAddressRepository,
  ) {}

  async setTheFirstMainAddress(user_id: string) {
    const addresses =
      await this.findAllAnyAddressRepository.findAllAnyAddresses(user_id);

    if (!addresses.length) {
      throw new NotFoundException(['No addresses found']);
    }

    await this.prisma.endereco
      .update({
        where: {
          id: addresses[0].id,
        },
        data: {
          main_address: true,
        },
      })
      .catch((err) => {
        console.log(err.message);
        throw new BadRequestException(['Erro ao ativar endereco', err.message]);
      });
  }
}
