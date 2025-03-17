import { CreateProductWithFileDto } from '../dto/create-product-with-file.dto';

export interface UpdateProductInterface {
  updateProduct: (
    id_product: string,
    body: CreateProductWithFileDto,
  ) => Promise<{
    menssage: string;
    product_name: string;
  }>;

  updateImageProductFile(
    file: Express.Multer.File,
    id_product: string,
  ): Promise<{
    menssage: string;
    urlFile: string;
  }>;
}
