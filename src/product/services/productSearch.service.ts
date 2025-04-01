import { BadRequestException, Injectable } from '@nestjs/common';
import { CachingService } from 'src/caching/caching.service';
import { TIMESTAMP_CACHING } from 'src/caching/enum/key-caching.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnvConfigService } from 'src/shared/infraestructure/env_config/env_config.service';
import { ListarProdutosDto } from '../dto/listar-produtos.dto';
import { ProductSearchInterface } from '../interfaces/product-search.interface';
import { CountProductRepository } from '../repository/countProductRepository.service';
import { FindProductByTermoRepository } from '../repository/findProductByTermoRepository.service';
import { CachingProductsByTermo } from './cachingProductsByTermo.service';

@Injectable()
export class ProductSearchByTermoService implements ProductSearchInterface {
  constructor(
    private readonly findProductByTermoRepository: FindProductByTermoRepository,
    private readonly cachingProductsByTermo: CachingProductsByTermo,
    private readonly envConfig: EnvConfigService,
    private readonly countProductRepository: CountProductRepository,
  ) {}

  async searchProductsByTerm(
    value: string,
    page: number,
  ): Promise<ListarProdutosDto> {
    try {
      console.time('listarProductByTermo');
      const itemsPerPage = this.envConfig.getItensPerPage();

      const skip = (page - 1) * itemsPerPage;

      // Gerando chave única para o cache baseado no valor da pesquisa

      // Verificando se os dados estão no cache
      let cachedProducts = await this.cachingProductsByTermo.getCaching(
        value,
        page,
      );

      if (!cachedProducts) {
        // Consultando o total de produtos que atendem ao termo de busca
        const totalCount =
          await this.countProductRepository.countByTermo(value);
        // Calculando o total de páginas
        const totalPages = Math.ceil(totalCount / itemsPerPage);

        // Consultando os produtos com base no termo e na paginação
        const products =
          await this.findProductByTermoRepository.findProductByTermo(
            value,
            skip,
            itemsPerPage,
          );

        // Armazenando no cache para futuras buscas
        cachedProducts = {
          totalPages,
          product: products,
        };

        // Salvando no cache com tempo de expiração de 30 minutos
        await this.cachingProductsByTermo.createCaching(
          cachedProducts,
          value,
          page,
        );
      } else {
        console.log('Cache hit: retornando do cache');
      }

      console.timeEnd('listarProductByTermo');

      return cachedProducts;
    } catch (error) {
      throw error;
    }
  }
}
