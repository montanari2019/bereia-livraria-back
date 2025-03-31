import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllAddressesDto } from '../dto/find-all-address.dto';

@Injectable()
export class FindAllAnyAddressRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAllAnyAddresses(id_user: string): Promise<FindAllAddressesDto[]> {
    const data = await this.prisma.endereco
      .findMany({
        select: {
          id: true,
          name_address: true,
          address: true,
          city_state_address: true,
          cep: true,
          complement: true,
          number_address: true,
          main_address: true,
        },
        where: {
          usuario_id: id_user,
          active: true,
        },
        orderBy: {
          created_at: 'asc',
        },
      })
      .catch((error) => {
        throw new BadRequestException([
          'Erro ao buscar enderecoes do usuário',
          error.message,
        ]);
      });

    return data;
  }
}
