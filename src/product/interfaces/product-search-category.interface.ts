import { ListarProdutosDto } from '../dto/listar-produtos.dto';

export interface ProductSearchByCategoryInterface {
  searchProductsByCategory(
    value: string,
    page: number,
  ): Promise<ListarProdutosDto>;
}
