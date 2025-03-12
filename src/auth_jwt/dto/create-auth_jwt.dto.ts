import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthJwtDto {
  @ApiProperty()
  access_token: string;
}
