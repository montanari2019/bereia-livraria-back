import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrimaryAddressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateNewPrimaryAddress(id_address: string): Promise<{
    message: string;
  }> {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async updateCurrentPrimaryAddress(
    id_user: string,
    id_current_primary_address: string,
  ) {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async searchPrimaryAddress(id_user: string) {
    try {
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
    } catch (erro) {
      throw erro;
    }
  }
}
