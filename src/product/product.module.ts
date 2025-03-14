import { Module } from '@nestjs/common';
import { AuthJwtModule } from 'src/auth_jwt/auth_jwt.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { S3Module } from 'src/s3/s3.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CreateProductService } from './services/createProduct.service';
import { UpdateProductService } from './services/updateProduct.service';
import { FindUniqueProductService } from './services/findUniqueProduct.service';
import { DeleteProductService } from './services/deletarProduct.services';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    CreateProductService,
    UpdateProductService,
    FindUniqueProductService,
    DeleteProductService,
  ],
  imports: [PrismaModule, AuthJwtModule, S3Module],
})
export class ProductModule {}
