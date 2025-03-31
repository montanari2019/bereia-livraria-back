import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CustomAuthRequest } from 'src/auth_jwt/interface/custom-request.interface';
import { CreateEnderecoDto } from '../dto/create-endereco.dto';
import { CreateEnderecoInterface } from '../interfaces/create-endereco.interface';
import { CreateAddressRepository } from '../repository/createAddressRepository.service';
import { VerifyQuantityAdressRepository } from '../repository/verifyQuantityAdressRepository.service';

@Injectable()
export class CreateEnderecoService implements CreateEnderecoInterface {
  constructor(
    private createAddressRepository: CreateAddressRepository,
    @Inject(REQUEST) private readonly request: CustomAuthRequest,
    private verifyAddresService: VerifyQuantityAdressRepository,
  ) {}
  async createEndereco(body: CreateEnderecoDto): Promise<{
    message: string;
  }> {
    const user_id = this.request.payload.id;
    try {
      const count =
        await this.verifyAddresService.verifyQuantityAndAddress(user_id);
      return await this.createAddressRepository.createAddress(
        body,
        user_id,
        count == 0,
      );
    } catch (err) {
      throw err;
    }
  }
}
