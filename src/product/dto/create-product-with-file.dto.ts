import { ApiProperty } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class CreateProductWithFileDto extends CreateProductDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;
}
