import { PartialType } from '@nestjs/swagger';
import { CreateAuthJwtDto } from './create-auth_jwt.dto';

export class UpdateAuthJwtDto extends PartialType(CreateAuthJwtDto) {}
