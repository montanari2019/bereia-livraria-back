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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateProductWithFileDto } from './dto/create-product-with-file.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoriasService } from './services/categorias.service';
import { CreateProductService } from './services/createProduct.service';
import { DeleteProductService } from './services/deletarProduct.service';
import { ProductListagemService } from './services/productListagem.service';
import { ProductSearchByCategoryService } from './services/productSearcByCategory.service';
import { ProductSearchByTermoService } from './services/productSearch.service';
import { UpdateProductService } from './services/updateProduct.service';
import { JwtAuthGuard } from 'src/auth_jwt/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { ROLES_ENUM } from 'src/roles/roles.enum';
import { CategoriasResponseDto } from './dto/categorias-response.dto';
import { ListarProdutosDto } from './dto/listar-produtos.dto';

@Controller('product')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles(ROLES_ENUM.ADMIN)
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
  @Roles(ROLES_ENUM.ADMIN)
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
  @ApiOkResponse({ type: CategoriasResponseDto })
  findAll() {
    return this.categoriasProducts.ListarCategorias();
  }

  @Get('all')
  @ApiOkResponse({ type: ListarProdutosDto })
  async listarProdutos(@Query('page') page: number = 1): Promise<any> {
    return this.listagemProducts.listarProduct(page);
  }
  @Get('/termo')
  @ApiOkResponse({ type: ListarProdutosDto })
  async listarProdutosByTermo(
    @Query('page') page: number = 1,
    @Query('value') value: string,
  ): Promise<any> {
    return this.searchByTermoProducts.searchProductsByTerm(value, page);
  }
  @Get('/categoria')
  @ApiOkResponse({ type: ListarProdutosDto })
  async listarProdutosByCategoria(
    @Query('page') page: number = 1,
    @Query('value') value: string,
  ): Promise<any> {
    return this.searchByCategoriaProducts.searchProductsByCategory(value, page);
  }

  @Delete('delete/:id')
  @Roles(ROLES_ENUM.ADMIN)
  delete(@Param('id') id_product: string) {
    return this.deleteProductService.deleteProduct(id_product);
  }
}
