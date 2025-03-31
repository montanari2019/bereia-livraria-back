import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MainAddressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateNewPrimaryAddress(id_address: string): Promise<{
    message: string;
  }> {
    return await this.prisma.endereco
      .update({
        where: {
          id: id_address,
        },
        data: {
          main_address: true,
        },
      })
      .then(() => {
        return { message: 'Novo Endereço principal atualizado com sucesso!' };
      })
      .catch((error) => {
        throw new BadRequestException([
          'Erro ao atualizar endereço principal new Primary Adrress',
          error.message,
        ]);
      });
  }

  async updateCurrentPrimaryAddress(
    id_user: string,
    id_current_primary_address: string,
  ) {
    await this.prisma.endereco
      .update({
        where: {
          usuario_id: id_user,
          id: id_current_primary_address,
          main_address: true,
        },
        data: {
          main_address: false,
        },
      })
      .catch((error) => {
        throw new BadRequestException([
          'Erro ao atualizar endereços principais',
          error.message,
        ]);
      });
  }

  async searchPrimaryAddress(id_user: string) {
    const current_address_primary = await this.prisma.endereco
      .findFirst({
        where: {
          main_address: true,
          usuario_id: id_user,
        },
        select: {
          id: true,
          address: true,
        },
      })
      .catch((error) => {
        throw new BadRequestException([
          'Erro ao buscar endereço principal',
          error.message,
        ]);
      });
    return current_address_primary;
  }
}
