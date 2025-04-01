import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FindUserByIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserById(id_usuario: string) {
    return await this.prisma.usuario
      .findUnique({
        where: {
          id: id_usuario,
        },
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new BadRequestException(['Erro ao procurar o usuário', error]);
      });
  }
}
