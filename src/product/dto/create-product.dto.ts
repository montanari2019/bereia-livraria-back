import { ApiProperty } from '@nestjs/swagger';
import { product } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto implements Partial<product> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  name: string;

  @ApiProperty()
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'price must be a valid number' },
  )
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => parseFloat(value))
  price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  category: string;
}
