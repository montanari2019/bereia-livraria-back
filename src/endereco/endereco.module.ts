import { Module } from '@nestjs/common';
import { EnderecoController } from './endereco.controller';
import { CreateEnderecoService } from './services/createEndereco.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthJwtModule } from 'src/auth_jwt/auth_jwt.module';
import { CachingModule } from 'src/caching/caching.module';
import { EnvConfigModule } from 'src/shared/infraestructure/env_config/env-config.module';
import { VerifyQuantityAdressService } from './services/verifyQuantityAdress.service';

@Module({
  controllers: [EnderecoController],
  imports: [PrismaModule, AuthJwtModule, CachingModule, EnvConfigModule],
  providers: [CreateEnderecoService, VerifyQuantityAdressService],
})
export class EnderecoModule {}
