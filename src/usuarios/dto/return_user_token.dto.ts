import { ApiProperty } from '@nestjs/swagger';

export class UserTokenDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone_number: string;

  @ApiProperty()
  tentativas: number;

  @ApiProperty()
  active_acount: boolean;

  @ApiProperty()
  password: string;
}
