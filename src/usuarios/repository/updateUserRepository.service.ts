import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsuarioPublicDto } from '../dto/public-usuario.dto';

@Injectable()
export class UpdateUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async update(updateUser: UsuarioPublicDto, user_id: string) {
    return await this.prisma.usuario
      .update({
        where: { id: user_id },
        data: {
          doc: updateUser.doc,
          email: updateUser.email,
          name: updateUser.name,
          phone_number: updateUser.phone_number,
        },
      })
      .then(() => {
        return { message: 'Usuário alterado com sucesso!' };
      })
      .catch((error) => {
        throw new BadRequestException(['Erro ao alterar o usuário', error]);
      });
  }
}
