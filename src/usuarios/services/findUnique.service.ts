import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindUniqueUserInterface } from '../interface/find_unique.interface';
import { UsuarioPublicDto } from '../dto/public-usuario.dto';

@Injectable()
export class FindUniqueUserService implements FindUniqueUserInterface {
  constructor(private readonly Prisma: PrismaService) {}

  async findUniqueUser(email: string): Promise<UsuarioPublicDto> {
    try {
      const user = await this.Prisma.usuario
        .findUnique({
          where: {
            email,
          },
          select: {
            active_acount: true,
            doc: true,
            email: true,
            name: true,
            phone_number: true,
          },
        })
        .catch((error) => {
          throw new InternalServerErrorException([
            'Erro ao buscar usuário',
            error.mensage,
          ]);
        });

      if (user === null) {
        throw new NotFoundException(['User not found']);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
