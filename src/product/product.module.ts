import { Module } from '@nestjs/common';
import { AuthJwtModule } from 'src/auth_jwt/auth_jwt.module';
import { CachingModule } from 'src/caching/caching.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { S3Module } from 'src/s3/s3.module';
import { EnvConfigModule } from 'src/shared/infraestructure/env_config/env-config.module';
import { ProductController } from './product.controller';
import { CategoriasService } from './services/categorias.service';
import { CreateProductService } from './services/createProduct.service';
import { DeleteProductService } from './services/deletarProduct.service';
import { FindUniqueProductService } from './services/findUniqueProduct.service';
import { ProductListagemService } from './services/productListagem.service';
import { ProductSearchByCategoryService } from './services/productSearcByCategory.service';
import { ProductSearchByTermoService } from './services/productSearch.service';
import { UpdateProductService } from './services/updateProduct.service';

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
