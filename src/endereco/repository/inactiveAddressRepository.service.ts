import { BadRequestException, Injectable } from '@nestjs/common';
import { MessageResponseDto } from 'src/@types/message-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InactiveAddressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async inactiveAddress(id_address: string): Promise<MessageResponseDto> {
    return await this.prisma.endereco
      .update({
        where: {
          id: id_address,
        },
        data: {
          active: false,
        },
      })
      .then(() => {
        return {
          message: 'Endereço deletado com sucesso!',
        };
      })
      .catch((err) => {
        throw new BadRequestException([
          'Erro ao inativar endereco',
          err.message,
        ]);
      });
  }
}
