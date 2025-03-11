import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CreateUsuariosService {
  constructor(private prisma: PrismaService) {}
  create(createUsuarioDto: CreateUsuarioDto) {}
}
