import { Injectable } from '@nestjs/common';
import { DeleteUsuarioInterface } from '../interface/delete_usuario.interface';
import { DeleteUserRepository } from '../repository/deleteUserRepository.service';

@Injectable()
export class DeleteUsuariosService implements DeleteUsuarioInterface {
  constructor(private readonly deleteUserRepository: DeleteUserRepository) {}

  async deleteUser(id_user: string) {
    try {
      return await this.deleteUserRepository.deleteUser(id_user);
    } catch (error) {
      throw error;
    }
  }
}
