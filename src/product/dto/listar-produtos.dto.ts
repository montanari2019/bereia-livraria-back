import { IsArray, IsNumber } from 'class-validator';
import { ProductDto } from './product.dto';

export class ListarProdutosDto {
  @IsArray()
  product: ProductDto[];

  @IsNumber()
  totalPages: number;
}
