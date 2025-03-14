import { ApiProperty } from '@nestjs/swagger';

export class FindUniqueProductDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  category: string;

  @ApiProperty()
  available: boolean;

  @ApiProperty()
  image_url: string;
}
