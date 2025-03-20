import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CustomAuthRequest } from 'src/auth_jwt/interface/custom-request.interface';
import { UpdatePrimaryAddressInterface } from '../interfaces/update-address-primary.interface';
import { PrimaryAddressRepository } from '../repository/updatePrimaryAddressRepository.service';

@Injectable()
export class UpdatePrimaryAddressServices
  implements UpdatePrimaryAddressInterface
{
  constructor(
    @Inject(REQUEST) private readonly request: CustomAuthRequest,
    private readonly repositoryPrimaryAddressService: PrimaryAddressRepository,
  ) {}

  async updatePrimaryAddress(
    id_endereco: string,
  ): Promise<{ message: string }> {
    try {
      const user_id = this.request.payload.id;
      const current_address_primary =
        await this.repositoryPrimaryAddressService.searchPrimaryAddress(
          user_id,
        );

      if (current_address_primary === null) {
        return await this.repositoryPrimaryAddressService.updateNewPrimaryAddress(
          id_endereco,
        );
      }

      await this.repositoryPrimaryAddressService.updateCurrentPrimaryAddress(
        user_id,
        current_address_primary.id,
      );

      return await this.repositoryPrimaryAddressService.updateNewPrimaryAddress(
        id_endereco,
      );
    } catch (error) {
      throw error;
    }
  }
}
