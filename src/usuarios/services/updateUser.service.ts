import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioPublicDto } from '../dto/public-usuario.dto';
import { UpdateUsuariosServiceInterface } from '../interface/update_usuarios_service.interface';
import { ActivatedAccountRepository } from '../repository/activatedAccountRepository.service';
import { BlockedUserRepository } from '../repository/blockedRepository.service';
import { FindUserByIdRepository } from '../repository/findUserByIdRepository.service';
import { UpdateUserRepository } from '../repository/updateUserRepository.service';
@Injectable()
export class UpdateUsuariosService implements UpdateUsuariosServiceInterface {
  constructor(
    private readonly blockedUserRepository: BlockedUserRepository,
    private readonly activatedAccountRepository: ActivatedAccountRepository,
    private readonly findUserByIdRepository: FindUserByIdRepository,
    private readonly updateUserRepository: UpdateUserRepository,
  ) {}
  async blockedAccount(email: string): Promise<void> {
    return await this.blockedUserRepository.blockedAccount(email);
  }
  async updateUser(updateUser: UsuarioPublicDto, user_id: string) {
    try {
      await this.findOutIfUserReally(user_id);

      return await this.updateUserRepository.update(updateUser, user_id);
    } catch (error) {
      throw error;
    }
  }

  async findOutIfUserReally(id_user: string) {
    const user = await this.findUserByIdRepository.findUserById(id_user);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
  }

  async activatedAccount(tokenActive: string) {
    await this.activatedAccountRepository.activatedAccount('EMAIL DO USUÁRIO');
  }
}
