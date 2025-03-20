import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UpdateAddressInterface } from '../interfaces/update-address.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateEnderecoDto } from '../dto/update-endereco.dto';
import { CustomAuthRequest } from 'src/auth_jwt/interface/custom-request.interface';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class UpdateAddressService implements UpdateAddressInterface {
  constructor(
    private readonly prisma: PrismaService,

    @Inject(REQUEST) private readonly request: CustomAuthRequest,
  ) {}

  async updateAddress(
    id_endereco: string,
    data: UpdateEnderecoDto,
  ): Promise<{ message: string }> {
    try {
      return await this.prisma.endereco
        .update({
          where: {
            id: id_endereco,
            usuario_id: this.request.payload.id,
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
