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
import { CategoryRepository } from './repository/categoryRepository.service';
import { CachingCategoriasService } from './services/cachingCategorias.service';
import { CreateProductRepository } from './repository/createProductRepository.service';
import { DeleteProductRepository } from './repository/deleteProductRepository.service';
import { FindUniqueProductRepository } from './repository/findUniqueRepository.service';
import { FindAllPaginateProductRepository } from './repository/findAllPaginateProductRepository.service';
import { FindAllTheFirstPageProductRepostory } from './repository/findAllTheFirstPageProductRepostory.service';
import { CountProductRepository } from './repository/countProductRepository.service';
import { CachingCountProductService } from './services/cachingCountProduct.service';
import { ProductSearcByCategoryRepository } from './repository/productSearcByCategoryRepository.service';
import { CachingProductsByCategory } from './services/cachingProductsByCategory.service';
import { CachingFindFirstPageProductService } from './services/cachingFindFirstPageProduct.service';
import { FindProductByTermoRepository } from './repository/findProductByTermoRepository.service';
import { CachingProductsByTermo } from './services/cachingProductsByTermoservice';
import { UpdateProductRepository } from './repository/updateProductRepository.service';
import { UpdateProductFileRepository } from './repository/updateProductFileRepository.service';

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
    CachingCategoriasService,
    CachingCountProductService,
    CachingFindFirstPageProductService,
    CachingProductsByCategory,
    CachingProductsByTermo,

    CategoryRepository,
    CreateProductRepository,
    DeleteProductRepository,
    FindUniqueProductRepository,
    FindAllPaginateProductRepository,
    FindAllTheFirstPageProductRepostory,
    CountProductRepository,
    ProductSearcByCategoryRepository,
    FindProductByTermoRepository,
    UpdateProductRepository,
    UpdateProductFileRepository,
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
