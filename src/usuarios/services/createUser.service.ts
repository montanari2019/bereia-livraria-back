import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuariosServiceInterface } from '../interface/create_usuarios_service.interface';
import { CryptoPasswordUsuariosService } from '../services/cryptoPassword.service';
import { FindUserByDocAndEmailRepository } from '../repository/findUserByDocAndEmailRespository.service';
import { CreateUserRepository } from '../repository/createUserRepository.service';

@Injectable()
export class CreateUsuariosService implements CreateUsuariosServiceInterface {
  constructor(
    private readonly cryptoPasswordService: CryptoPasswordUsuariosService,
    private readonly createUserRepository: CreateUserRepository,
    private readonly findUserByDocAndEmailRepository: FindUserByDocAndEmailRepository,
  ) {}

  async createUser(createUsuarioDto: CreateUsuarioDto) {
    const { password, ...userData } = createUsuarioDto;

    try {
      const hashedPassword =
        await this.cryptoPasswordService.cryptoPassword(password);

      await this.validateUserEmailAndDoc(userData.doc, userData.email);

      return await this.createUserRepository.createUser(
        userData,
        hashedPassword,
      );
    } catch (error) {
      throw error;
    }
  }

  async validateUserEmailAndDoc(doc_user: string, email: string) {
    try {
      const userExists =
        await this.findUserByDocAndEmailRepository.findUserByDocAndEmail(
          doc_user,
          email,
        );

      if (userExists.length) {
        throw new BadRequestException(['Usuário já cadastrado']);
      }

      return;
    } catch (erro) {
      throw erro;
    }
  }
}
