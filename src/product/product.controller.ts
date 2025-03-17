import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductService } from './services/createProduct.service';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductWithFileDto } from './dto/create-product-with-file.dto';
import { UpdateProductService } from './services/updateProduct.service';
import { DeleteProductService } from './services/deletarProduct.services';
import { CategoriasService } from './services/categorias.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly updateProductService: UpdateProductService,
    private readonly deleteProductService: DeleteProductService,
    private readonly categoriasProducts: CategoriasService,
  ) {}

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProductWithFileDto })
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.createProductService.createProduct(createProductDto, file);
  }
  @Put('update/:id')
  @ApiBody({ type: UpdateProductDto })
  update(
    @Param('id') id_product: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.updateProductService.updateProduct(id_product, {
      ...updateProductDto,
    });
  }

  @Put('update/image/:id')
  @ApiOperation({ summary: 'Faz upload de uma imagem para o S3' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  updateImage(
    @Param('id') id_product: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.updateProductService.updateImageProductFile(file, id_product);
  }

  @Get('categorias')
  findAll() {
    return this.categoriasProducts.ListarCategorias();
  }

  @Delete('delete/:id')
  delete(@Param('id') id_product: string) {
    return this.deleteProductService.deleteProduct(id_product);
  }
}
