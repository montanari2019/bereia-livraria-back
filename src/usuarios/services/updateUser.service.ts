import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { UpdateUsuariosServiceInterface } from '../interface/update_usuarios_service.interface';
@Injectable()
export class UpdateUsuariosService implements UpdateUsuariosServiceInterface {
  constructor(private prisma: PrismaService) {}
  async updateUser(updateUser: UpdateUsuarioDto, user_id: string) {
    try {
      await this.prisma.usuario.update({
        where: { id: user_id },
        data: {
          ...updateUser,
        },
      });

      return { message: 'Usuário criado com sucesso!' };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao alterar usuário',
        error.message,
      );
    }
  }
}
