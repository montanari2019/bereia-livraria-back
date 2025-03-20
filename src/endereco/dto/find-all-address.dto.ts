import { ApiProperty } from '@nestjs/swagger';

export class FindAllAddressesDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'Condomínio Bela Vista' })
  name_address: string;

  @ApiProperty({ example: 'Avenida Brigadeiro Eduardo Gomes' })
  address: string;

  @ApiProperty({ example: '789' })
  number_address: string;

  @ApiProperty({ example: '76980-123' })
  cep: string;

  @ApiProperty({ example: 'Vilhena - RO' })
  city_state_address: string;

  @ApiProperty({ example: true })
  main_address: boolean;

  @ApiProperty({ example: 'Bloco B, Apto 302' })
  complement: string;
}
