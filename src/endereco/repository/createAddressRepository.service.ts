import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { VerifyQuantityAdressRepository } from './verifyQuantityAdressRepository.service';
import { CreateEnderecoDto } from '../dto/create-endereco.dto';

@Injectable()
export class CreateAddressRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createAddress(
    body: CreateEnderecoDto,
    user_id: string,
    main_address: boolean,
  ) {
    return await this.prisma.endereco
      .create({
        data: {
          ...body,
          main_address,
          usuario_id: user_id,
        },
      })
      .then(() => {
        return {
          message: 'Endereço criado com sucesso!',
        };
      })
      .catch((error) => {
        throw new BadRequestException([
          'Erro ao cadastrar endereço',
          error.message,
        ]);
      });
  }
}
