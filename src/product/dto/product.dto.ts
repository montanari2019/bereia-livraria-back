import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, IsUrl } from 'class-validator';

export class ProductDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Livro X' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'lorem inpulse generator' })
  @IsString()
  description: string;

  @ApiProperty({ example: 4500.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 20 })
  @IsNumber()
  stock: number;

  @ApiProperty({ example: 'fantasia' })
  @IsString()
  category: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  available: boolean;

  @ApiProperty({ example: 'https://example.com/notebook.jpg' })
  @IsUrl()
  image_url: string;
}
