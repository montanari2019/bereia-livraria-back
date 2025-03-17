import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { CreateProductWithFileDto } from './dto/create-product-with-file.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoriasService } from './services/categorias.service';
import { CreateProductService } from './services/createProduct.service';
import { DeleteProductService } from './services/deletarProduct.services';
import { ProductListagemService } from './services/productListagem.service';
import { ProductSearchByCategoryService } from './services/productSearcByCategory.service';
import { ProductSearchByTermoService } from './services/productSearch.service';
import { UpdateProductService } from './services/updateProduct.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly updateProductService: UpdateProductService,
    private readonly deleteProductService: DeleteProductService,
    private readonly categoriasProducts: CategoriasService,
    private readonly listagemProducts: ProductListagemService,
    private readonly searchByTermoProducts: ProductSearchByTermoService,
    private readonly searchByCategoriaProducts: ProductSearchByCategoryService,
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

  @Get('all')
  async listarProdutos(@Query('page') page: number = 1): Promise<any> {
    return this.listagemProducts.listarProduct(page);
  }
  @Get('/termo')
  async listarProdutosByTermo(
    @Query('page') page: number = 1,
    @Query('value') value: string,
  ): Promise<any> {
    return this.searchByTermoProducts.searchProductsByTerm(value, page);
  }
  @Get('/categoria')
  async listarProdutosByCategoria(
    @Query('page') page: number = 1,
    @Query('value') value: string,
  ): Promise<any> {
    return this.searchByCategoriaProducts.searchProductsByCategory(value, page);
  }

  @Delete('delete/:id')
  delete(@Param('id') id_product: string) {
    return this.deleteProductService.deleteProduct(id_product);
  }
}
