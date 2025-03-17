import { ListarProdutosDto } from '../dto/listar-produtos.dto';
import { ProductDto } from '../dto/product.dto';

export interface ProductLisatagemInterface {
  listarProduct: (page: number) => Promise<ListarProdutosDto>;
  listarPrimeiraPaginaProdutos(): Promise<ProductDto[]>;
  countProducts(): Promise<number>;
}
