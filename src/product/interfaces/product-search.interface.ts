import { ListarProdutosDto } from '../dto/listar-produtos.dto';

export interface ProductSearchInterface {
  searchProductsByTerm(value: string, page: number): Promise<ListarProdutosDto>;
}
