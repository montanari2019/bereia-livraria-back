import { CreateProductDto } from '../dto/create-product.dto';

export interface CreateProductInterface {
  createProduct: (
    value: CreateProductDto,
    file: Express.Multer.File,
    user_id: string,
  ) => Promise<{
    menssage: string;
    product_name: string;
  }>;
}
