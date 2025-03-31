import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UpdateAddressInterface } from '../interfaces/update-address.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateEnderecoDto } from '../dto/update-endereco.dto';
import { CustomAuthRequest } from 'src/auth_jwt/interface/custom-request.interface';
import { REQUEST } from '@nestjs/core';
import { UpdateAddressRepository } from '../repository/updateAddressRepository.service';

@Injectable()
export class UpdateAddressService implements UpdateAddressInterface {
  constructor(
    @Inject(REQUEST) private readonly request: CustomAuthRequest,
    private readonly updateAddressRepository: UpdateAddressRepository,
  ) {}

  async updateAddress(
    id_endereco: string,
    data: UpdateEnderecoDto,
  ): Promise<{ message: string }> {
    try {
      const user_id = await this.request.payload.id;
      return await this.updateAddressRepository.updateAddress(
        id_endereco,
        user_id,
        data,
      );
    } catch (error) {
      throw error;
    }
  }
}
