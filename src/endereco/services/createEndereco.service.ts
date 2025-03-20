import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateEnderecoInterface } from '../interfaces/create-endereco.interface';
import { CreateEnderecoDto } from '../dto/create-endereco.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { VerifyQuantityAdressService } from './verifyQuantityAdress.service';
import { REQUEST } from '@nestjs/core';
import { CustomAuthRequest } from 'src/auth_jwt/interface/custom-request.interface';

@Injectable()
export class CreateEnderecoService implements CreateEnderecoInterface {
  constructor(
    private readonly prisma: PrismaService,
    private verifyAddresService: VerifyQuantityAdressService,
    @Inject(REQUEST) private readonly request: CustomAuthRequest,
  ) {}
  async createEndereco(body: CreateEnderecoDto): Promise<{
    message: string;
  }> {
    const user_id = this.request.payload.id;
    try {
      const count =
        await this.verifyAddresService.verifyQuantityAndAddress(user_id);
      await this.prisma.endereco
        .create({
          data: {
            ...body,
            usuario_id: user_id,
            main_address: count === 0,
          },
        })
        .catch((error) => {
          throw new BadRequestException([
            'Erro ao cadastrar endereço',
            error.message,
          ]);
        });

      return {
        message: 'Endereço criado com sucesso!',
      };
    } catch (err) {
      throw err;
    }
  }
}
