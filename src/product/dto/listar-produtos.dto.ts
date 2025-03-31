import { IsArray, IsNumber } from 'class-validator';
import { ProductDto } from './product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ListarProdutosDto {
  @ApiProperty({ example: 10 })
  @IsNumber()
  totalPages: number;
  @ApiProperty({ type: [ProductDto] })
  @IsArray()
  product: ProductDto[];
}
