import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDataRepositoryDto } from '../dto/user-date.dto';

@Injectable()
export class CreateUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(userData: UserDataRepositoryDto, hashedPassword: string) {
    return await this.prisma.usuario
      .create({
        data: {
          ...userData,
          password: hashedPassword,
        },
      })
      .then(() => {
        return { message: 'Usuário criado com sucesso!' };
      })
      .catch((error) => {
        throw new BadRequestException(['Erro ao salvar o usuário', error]);
      });
  }
}
