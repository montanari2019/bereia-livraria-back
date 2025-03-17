import { Injectable } from '@nestjs/common';
import { ProductSearchInterface } from '../interfaces/product-search.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CachingService } from 'src/caching/caching.service';
import { EnvConfigService } from 'src/shared/infraestructure/env_config/env_config.service';
import { TIMESTAMP_CACHING } from 'src/caching/enum/key-caching.enum';
import { ListarProdutosDto } from '../dto/listar-produtos.dto';

@Injectable()
export class ProductSearchByTermoService implements ProductSearchInterface {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheManager: CachingService,
    private readonly envConfig: EnvConfigService,
  ) {}

  async searchProductsByTerm(value: string, page: number): Promise<any> {
    console.time('listarProductByTermo');
    const itemsPerPage = this.envConfig.getItensPerPage();

    const skip = (page - 1) * itemsPerPage;

    // Gerando chave única para o cache baseado no valor da pesquisa
    const cacheKey = `products_search_${value.toLowerCase()}_page_${page}`;

    // Verificando se os dados estão no cache
    let cachedProducts =
      await this.cacheManager.getCaching<ListarProdutosDto>(cacheKey);

    if (!cachedProducts) {
      // Consultando o total de produtos que atendem ao termo de busca
      const totalCount = await this.prisma.product.count({
        where: {
          OR: [
            { name: { contains: value, mode: 'insensitive' } },
            { description: { contains: value, mode: 'insensitive' } },
          ],
        },
      });

      // Calculando o total de páginas
      const totalPages = Math.ceil(totalCount / itemsPerPage);

      // Consultando os produtos com base no termo e na paginação
      const products = await this.prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: value, mode: 'insensitive' } },
            { description: { contains: value, mode: 'insensitive' } },
          ],
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
        TIMESTAMP_CACHING.MIN_30,
      );
    } else {
      console.log('Cache hit: retornando do cache');
    }

    console.timeEnd('listarProductByTermo');

    return cachedProducts;
  }
}
