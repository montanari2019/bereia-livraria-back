import { Module } from '@nestjs/common';
import { UsuariosService } from './services/usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { CreateUsuariosService } from './services/createUser.service';
import { PrismModule } from 'src/prisma/prisma.module';
import { EnvConfigModule } from 'src/shared/infraestructure/env_config/env-config.module';
import { CryptoPasswordUsuariosService } from './services/cryptoPassword.service';

@Module({
  controllers: [UsuariosController],
  imports: [PrismModule, EnvConfigModule],
  providers: [
    UsuariosService,
    CreateUsuariosService,
    CryptoPasswordUsuariosService,
  ],
})
export class UsuariosModule {}
