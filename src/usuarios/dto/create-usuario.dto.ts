import { ApiProperty } from '@nestjs/swagger';
import { usuario } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsCpf } from 'src/custom_validators/cpf.validator';

export class CreateUsuarioDto implements Partial<usuario> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsCpf()
  doc: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
