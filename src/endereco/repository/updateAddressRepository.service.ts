import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateEnderecoDto } from '../dto/update-endereco.dto';

@Injectable()
export class UpdateAddressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateAddress(
    id_endereco: string,
    usuario_id: string,
    data: UpdateEnderecoDto,
  ): Promise<{ message: string }> {
    try {
      return await this.prisma.endereco
        .update({
          where: {
            id: id_endereco,
            usuario_id: usuario_id,
          },
          data: {
            ...data,
          },
        })
        .then(() => {
          return {
            message: 'Address updated successfully',
          };
        })
        .catch((error) => {
          throw new BadRequestException([
            'Erro ao atualizar endereço',
            error.message,
          ]);
        });
    } catch (error) {
      throw error;
    }
  }
}
