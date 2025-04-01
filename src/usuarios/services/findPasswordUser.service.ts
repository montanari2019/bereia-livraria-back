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
import { FindUserByEmailPrivateRepository } from '../repository/findUserByEmailPrivateRepository.service';

@Injectable()
export class FindPasswordUserService implements FindPasswordUserInterface {
  constructor(
    private readonly findUserByEmailRepository: FindUserByEmailPrivateRepository,
  ) {}

  async findPasswordUser(email: string): Promise<UserTokenDto> {
    try {
      const user = await this.findUserByEmailRepository.findUserByEmail(email);

      if (user === null) {
        throw new UnauthorizedException(['Email ou senha estão incorretos']);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
