import { Module } from '@nestjs/common';
import { EnderecoController } from './endereco.controller';
import { CreateEnderecoService } from './services/createEndereco.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthJwtModule } from 'src/auth_jwt/auth_jwt.module';
import { CachingModule } from 'src/caching/caching.module';
import { EnvConfigModule } from 'src/shared/infraestructure/env_config/env-config.module';
import { VerifyQuantityAdressRepository } from './repository/verifyQuantityAdressRepository.service';
import { UpdateAddressService } from './services/updateAddress.service';
import { UpdatePrimaryAddressServices } from './services/updateAddressPrimary.service';
import { MainAddressRepository } from './repository/mainAddressRepository.service';
import { CreateAddressRepository } from './repository/createAddressRepository.service';
import { UpdateAddressRepository } from './repository/updateAddressRepository.service';

@Module({
  controllers: [EnderecoController],
  imports: [PrismaModule, AuthJwtModule, CachingModule, EnvConfigModule],
  providers: [
    CreateEnderecoService,
    VerifyQuantityAdressRepository,
    UpdateAddressService,
    UpdatePrimaryAddressServices,

    CreateAddressRepository,
    MainAddressRepository,
    UpdateAddressRepository,
  ],
})
export class EnderecoModule {}
