import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CustomAuthRequest } from 'src/auth_jwt/interface/custom-request.interface';
import { UpdatePrimaryAddressInterface } from '../interfaces/update-address-primary.interface';
import { MainAddressRepository } from '../repository/mainAddressRepository.service';
import { FindAllActiveAddressRepository } from '../repository/findAllAddressRepository.service';
import { CachingFindAllAddressService } from './cachingAddress.service';

@Injectable()
export class UpdatePrimaryAddressServices
  implements UpdatePrimaryAddressInterface
{
  constructor(
    private readonly repositoryMainAddressRepository: MainAddressRepository,
    private readonly findAllAddressRepository: FindAllActiveAddressRepository,
    private readonly cachingFindAllAddressService: CachingFindAllAddressService,
  ) {}

  async updatePrimaryAddress(
    id_endereco: string,
    user_id: string,
  ): Promise<{ message: string }> {
    try {
      const current_address_primary =
        await this.repositoryMainAddressRepository.searchPrimaryAddress(
          user_id,
        );

      if (current_address_primary === null) {
        return await this.repositoryMainAddressRepository.updateNewPrimaryAddress(
          id_endereco,
        );
      }

      await this.repositoryMainAddressRepository.updateCurrentPrimaryAddress(
        user_id,
        current_address_primary.id,
      );

      const responseReturn =
        await this.repositoryMainAddressRepository.updateNewPrimaryAddress(
          id_endereco,
        );

      const findAll =
        await this.findAllAddressRepository.findAllAddresses(user_id);

      await this.cachingFindAllAddressService.createCachingAddress(
        user_id,
        findAll,
      );

      return responseReturn;
    } catch (error) {
      throw error;
    }
  }
}
