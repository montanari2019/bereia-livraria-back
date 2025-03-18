import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEnderecoInterface } from '../interfaces/create-endereco.interface';
import { CreateEnderecoDto } from '../dto/create-endereco.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { VerifyQuantityAdressService } from './verifyQuantityAdress.service';

@Injectable()
export class CreateEnderecoService implements CreateEnderecoInterface {
  constructor(
    private readonly prisma: PrismaService,
    private verifyAddresService: VerifyQuantityAdressService,
  ) {}
  async createEndereco(
    body: CreateEnderecoDto,
    user_id: string,
  ): Promise<{
    message: string;
  }> {
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
