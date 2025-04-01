import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FindUserByDocAndEmailRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findUserByDocAndEmail(document: string, email: string) {
    return await this.prisma.usuario
      .findMany({
        where: {
          OR: [{ doc: document }, { email }],
        },
        select: {
          password: false,
          id: true,
          email: true,
          name: true,
          phone_number: true,
          roles: true,
          doc: true,
          created_at: false,
          updated_at: false,
        },
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new BadRequestException([
          'Erro ao verificar existência do usuário',
          error,
        ]);
      });
    // Implemente aqui a lógica para buscar um usuário pelo documento e email
  }
}
