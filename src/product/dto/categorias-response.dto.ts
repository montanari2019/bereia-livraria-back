import { ApiProperty } from '@nestjs/swagger';

export class CategoriasResponseDto {
  @ApiProperty({ example: ['romance', 'ficção', 'aventura'], isArray: true })
  categorias: string[];
}
