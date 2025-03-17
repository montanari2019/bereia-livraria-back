import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthJwtModule } from './auth_jwt/auth_jwt.module';
import { ProductModule } from './product/product.module';
import { S3Module } from './s3/s3.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    UsuariosModule,
    ConfigModule.forRoot(),
    AuthJwtModule,
    S3Module,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
