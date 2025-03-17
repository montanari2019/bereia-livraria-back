import { BadRequestException, Injectable } from '@nestjs/common';
import { CachingService } from 'src/caching/caching.service';
import {
  KEY_CACHING_ENUM,
  TIMESTAMP_CACHING,
} from 'src/caching/enum/key-caching.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnvConfigService } from 'src/shared/infraestructure/env_config/env_config.service';
import { ListarProdutosDto } from '../dto/listar-produtos.dto';
import { ProductSearchByCategoryInterface } from '../interfaces/product-search-category.interface';

@Injectable()
export class ProductSearchByCategoryService
  implements ProductSearchByCategoryInterface
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheManager: CachingService,
    private readonly envConfig: EnvConfigService,
  ) {}
  async searchProductsByCategory(
    value: string,
    page: number,
  ): Promise<ListarProdutosDto> {
    try {
      console.time('listarProductByCategoria');
      const itemsPerPage = this.envConfig.getItensPerPage();

      const skip = (page - 1) * itemsPerPage;

      // Gerando chave única para o cache baseado no valor da pesquisa
      const cacheKey = `${KEY_CACHING_ENUM.SEARCH_PRODUCT_CATEGORY}_${value.toUpperCase()}`;

      // Verificando se os dados estão no cache
      let cachedProducts =
        await this.cacheManager.getCaching<ListarProdutosDto>(cacheKey);

      if (!cachedProducts) {
        // Consultando o total de produtos que atendem ao termo de busca
        const totalCount = await this.prisma.product
          .count({
            where: {
              OR: [{ category: { contains: value, mode: 'insensitive' } }],
            },
          })
          .catch((error) => {
            console.log(error.mensage);
            throw new BadRequestException([
              'Error ao contar produtos por categoria',
            ]);
          });

        // Calculando o total de páginas
        const totalPages = Math.ceil(totalCount / itemsPerPage);

        // Consultando os produtos com base no termo e na paginação
        const products = await this.prisma.product
          .findMany({
            where: {
              OR: [{ category: { contains: value, mode: 'insensitive' } }],
            },
            select: {
              id: true,
              name: true,
              price: true,
              available: true,
              category: true,
              description: true,
              image_url: true,
              stock: true,
            },
            skip,
            take: itemsPerPage,
            orderBy: {
              name: 'asc', // Ordenação alfabética por nome
            },
          })
          .catch((error) => {
            console.log(error.mensage);
            throw new BadRequestException([
              'Error ao buscar produtos por categoria',
            ]);
          });

        // Armazenando no cache para futuras buscas
        cachedProducts = {
          totalPages,
          product: products,
        };

        // Salvando no cache com tempo de expiração de 30 minutos
        await this.cacheManager.setCaching(
          cacheKey,
          cachedProducts,
          TIMESTAMP_CACHING.MIN_10,
        );
      } else {
        console.log('Cache hit: retornando do cache');
      }

      console.timeEnd('listarProductByCategoria');

      return cachedProducts;
    } catch (error) {
      throw error;
    }
  }
}
