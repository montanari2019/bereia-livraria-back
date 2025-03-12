import { Module } from '@nestjs/common';

import { UsuariosController } from './usuarios.controller';
import { CreateUsuariosService } from './services/createUser.service';
import { PrismModule } from 'src/prisma/prisma.module';
import { EnvConfigModule } from 'src/shared/infraestructure/env_config/env-config.module';
import { CryptoPasswordUsuariosService } from './services/cryptoPassword.service';
import { UpdateUsuariosService } from './services/updateUser.service';
import { DeleteUsuariosService } from './services/deleteUser.service';
import { FindUniqueUserService } from './services/findUnique.service';

@Module({
  controllers: [UsuariosController],
  imports: [PrismModule, EnvConfigModule],
  providers: [
    CreateUsuariosService,
    UpdateUsuariosService,
    CryptoPasswordUsuariosService,
    FindUniqueUserService,
    DeleteUsuariosService,
  ],
})
export class UsuariosModule {}
