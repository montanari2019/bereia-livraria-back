import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuarioPublicDto } from './dto/public-usuario.dto';
import { CreateUsuariosService } from './services/createUser.service';
import { UpdateUsuariosService } from './services/updateUser.service';
import { FindUniqueUserService } from './services/findUnique.service';
import { DeleteUsuariosService } from './services/deleteUser.service';

@Controller('usuario')
export class UsuariosController {
  constructor(
    private readonly usuarioCreateService: CreateUsuariosService,
    private readonly usuarioUpdateService: UpdateUsuariosService,
    private readonly usuarioFindUniqueService: FindUniqueUserService,
    private readonly usuarioDeleteService: DeleteUsuariosService,
  ) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioCreateService.createUser(createUsuarioDto);
  }

  @Get('findunique/:email')
  findOne(@Param('email') email: string) {
    return this.usuarioFindUniqueService.findUniqueUser(email);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UsuarioPublicDto) {
    return this.usuarioUpdateService.updateUser(updateUsuarioDto, id);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.usuarioDeleteService.deleteUser(id);
  }
}
