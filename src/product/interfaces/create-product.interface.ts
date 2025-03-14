import { CreateProductDto } from '../dto/create-product.dto';

export interface CreateProductInterface {
  createProduct: (
    value: CreateProductDto,
    file: Express.Multer.File,
  ) => Promise<{
    menssage: string;
    product_name: string;
  }>;
}
