import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTentativasLogin } from '../interface/update_tentativas_login';
import { UpdateTentativasRepository } from '../repository/updateTentativasLoginRepository.service';
import { ResetTentativasRepository } from '../repository/resetTentativasRepository.service';

@Injectable()
export class UpdateTentativasService implements UpdateTentativasLogin {
  constructor(
    private readonly updateTentativasRepository: UpdateTentativasRepository,
    private readonly resetTentativasRepository: ResetTentativasRepository,
  ) {}
  async resetTentativas(email: string): Promise<void> {
    return await this.resetTentativasRepository.reset(email);
  }

  async updateTentativas(email: string): Promise<void> {
    try {
      const user =
        await this.updateTentativasRepository.updateTentativas(email);

      if (user === null) {
        throw new NotFoundException(['User not found']);
      }

      return;
    } catch (error) {
      throw error;
    }
  }
}
