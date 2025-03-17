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
import { ProductListagemService } from './services/productListagem.service';
import { EnvConfigModule } from 'src/shared/infraestructure/env_config/env-config.module';
import { ProductSearchByTermoService } from './services/productSearch.service';
import { ProductSearchByCategoryService } from './services/productSearcByCategory.service';

@Module({
  controllers: [ProductController],
  providers: [
    CategoriasService,
    CreateProductService,
    UpdateProductService,
    FindUniqueProductService,
    DeleteProductService,
    ProductListagemService,
    ProductSearchByTermoService,
    ProductSearchByCategoryService,
  ],
  imports: [
    PrismaModule,
    AuthJwtModule,
    S3Module,
    CachingModule,
    EnvConfigModule,
  ],
})
export class ProductModule {}
