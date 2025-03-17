import { FindUniqueProductDto } from '../dto/find-unique-producto.dto';

export interface FindUniqueByIdProductInterface {
  fundUniqueProductById: (id_product: string) => Promise<FindUniqueProductDto>;
}
