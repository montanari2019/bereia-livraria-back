import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindUniqueUserInterface } from '../interface/find_unique.interface';
import { UsuarioPublicDto } from '../dto/public-usuario.dto';
import { FindPasswordUserInterface } from '../interface/find_password.interface';
import { UserTokenDto } from '../dto/return_user_token.dto';

@Injectable()
export class FindPasswordUserService implements FindPasswordUserInterface {
  constructor(private readonly Prisma: PrismaService) {}

  async findPasswordUser(email: string): Promise<UserTokenDto> {
    try {
      const user = await this.Prisma.usuario
        .findUnique({
          where: {
            email,
          },
          select: {
            password: true,
            id: true,
            email: true,
            name: true,
            phone_number: true,
            tentativas: true,
            active_acount: true,
          },
        })
        .catch((error) => {
          throw new InternalServerErrorException([
            'Erro ao buscar usuário 95',
            error.mensage,
          ]);
        });

      if (user === null) {
        throw new UnauthorizedException(['Email ou senha estão incorretos']);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
