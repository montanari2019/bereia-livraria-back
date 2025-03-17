export interface DeleteProductInterface {
  deleteProduct(id_product: string): Promise<{
    message: string;
  }>;
}
