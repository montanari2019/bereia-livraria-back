import { Injectable } from '@nestjs/common';
import { CreateAuthJwtDto } from './dto/create-auth_jwt.dto';
import { UpdateAuthJwtDto } from './dto/update-auth_jwt.dto';

@Injectable()
export class AuthJwtService {
  create(createAuthJwtDto: CreateAuthJwtDto) {
    return 'This action adds a new authJwt';
  }

  findAll() {
    return `This action returns all authJwt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authJwt`;
  }

  update(id: number, updateAuthJwtDto: UpdateAuthJwtDto) {
    return `This action updates a #${id} authJwt`;
  }

  remove(id: number) {
    return `This action removes a #${id} authJwt`;
  }
}
