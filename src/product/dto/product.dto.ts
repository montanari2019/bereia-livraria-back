import { IsBoolean, IsNumber, IsString, IsUrl } from 'class-validator';

export class ProductDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsString()
  category: string;

  @IsBoolean()
  available: boolean;

  @IsUrl()
  image_url: string;
}
