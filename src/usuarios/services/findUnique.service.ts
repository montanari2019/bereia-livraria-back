import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioPublicDto } from '../dto/public-usuario.dto';
import { FindUniqueUserInterface } from '../interface/find_unique.interface';
import { FindUserByEmailPublicRepository } from '../repository/findUserByEmailPublicRepository.service';

@Injectable()
export class FindUniqueUserService implements FindUniqueUserInterface {
  constructor(
    private readonly findUserByEmailPublicRepository: FindUserByEmailPublicRepository,
  ) {}

  async findUniqueUser(email: string): Promise<UsuarioPublicDto> {
    try {
      const user =
        await this.findUserByEmailPublicRepository.findUserByEmail(email);

      if (user === null) {
        throw new NotFoundException(['User not found']);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
