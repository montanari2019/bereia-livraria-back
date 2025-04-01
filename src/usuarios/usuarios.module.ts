import { Module } from '@nestjs/common';

import { UsuariosController } from './usuarios.controller';
import { CreateUsuariosService } from './services/createUser.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EnvConfigModule } from 'src/shared/infraestructure/env_config/env-config.module';
import { CryptoPasswordUsuariosService } from './services/cryptoPassword.service';
import { UpdateUsuariosService } from './services/updateUser.service';
import { DeleteUsuariosService } from './services/deleteUser.service';
import { FindUniqueUserService } from './services/findUnique.service';
import { FindPasswordUserService } from './services/findPasswordUser.service';
import { UpdateTentativasService } from './services/updateTentativasLogin.service';
import { FindUserByDocAndEmailRepository } from './repository/findUserByDocAndEmailRespository.service';
import { CreateUserRepository } from './repository/createUserRepository.service';
import { DeleteUserRepository } from './repository/deleteUserRepository.service';
import { FindUserByEmailPrivateRepository } from './repository/findUserByEmailPrivateRepository.service';
import { FindUserByEmailPublicRepository } from './repository/findUserByEmailPublicRepository.service';
import { ResetTentativasRepository } from './repository/resetTentativasRepository.service';
import { UpdateTentativasRepository } from './repository/updateTentativasLoginRepository.service';
import { BlockedUserRepository } from './repository/blockedRepository.service';
import { ActivatedAccountRepository } from './repository/activatedAccountRepository.service';
import { FindUserByIdRepository } from './repository/findUserByIdRepository.service';
import { UpdateUserRepository } from './repository/updateUserRepository.service';

@Module({
  controllers: [UsuariosController],
  exports: [
    CreateUsuariosService,
    UpdateUsuariosService,
    CryptoPasswordUsuariosService,
    FindUniqueUserService,
    DeleteUsuariosService,
    FindPasswordUserService,
    UpdateTentativasService,
  ],
  imports: [PrismaModule, EnvConfigModule],

  providers: [
    CreateUsuariosService,
    UpdateUsuariosService,
    CryptoPasswordUsuariosService,
    FindUniqueUserService,
    DeleteUsuariosService,
    FindPasswordUserService,
    UpdateTentativasService,

    FindUserByDocAndEmailRepository,
    CreateUserRepository,

    DeleteUserRepository,
    FindUserByEmailPrivateRepository,
    FindUserByEmailPublicRepository,
    ResetTentativasRepository,
    UpdateTentativasRepository,
    BlockedUserRepository,
    ActivatedAccountRepository,
    FindUserByIdRepository,
    UpdateUserRepository,
  ],
})
export class UsuariosModule {}
