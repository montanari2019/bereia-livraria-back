import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsValidCEP } from 'src/custom_validators/is-valid-cep';

export class CreateEnderecoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name_address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  number_address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cep: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city_state_address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  complement: string;
}
