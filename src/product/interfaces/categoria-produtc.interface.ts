export interface CategoriaProductsInterface {
  ListarCategorias: () => Promise<{
    categorias: string[];
  }>;
}
