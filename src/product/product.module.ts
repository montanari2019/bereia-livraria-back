import { Module } from '@nestjs/common';
import { AuthJwtModule } from 'src/auth_jwt/auth_jwt.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { S3Module } from 'src/s3/s3.module';
import { ProductController } from './product.controller';
import { CreateProductService } from './services/createProduct.service';
import { UpdateProductService } from './services/updateProduct.service';
import { FindUniqueProductService } from './services/findUniqueProduct.service';
import { DeleteProductService } from './services/deletarProduct.services';
import { CategoriasService } from './services/categorias.service';
import { CachingModule } from 'src/caching/caching.module';

@Module({
  controllers: [ProductController],
  providers: [
    CategoriasService,
    CreateProductService,
    UpdateProductService,
    FindUniqueProductService,
    DeleteProductService,
  ],
  imports: [PrismaModule, AuthJwtModule, S3Module, CachingModule],
})
export class ProductModule {}
