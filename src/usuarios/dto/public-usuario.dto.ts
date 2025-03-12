import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { IsCpf } from 'src/custom_validators/cpf.validator';

export class UsuarioPublicDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsCpf()
  doc: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone_number: string;
}
