import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { CreateEnderecoService } from './services/createEndereco.service';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth_jwt/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { ROLES_ENUM } from 'src/roles/roles.enum';
import { PayloadUserValidate } from 'src/auth_jwt/dto/payload_user_validate.dto';

@Controller('endereco')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class EnderecoController {
  constructor(private readonly createEnderecoService: CreateEnderecoService) {}

  @Post('create')
  @ApiBody({ type: CreateEnderecoDto })
  create(@Body() createEnderecoDto: CreateEnderecoDto, @Req() request) {
    const user = request.payload as PayloadUserValidate;
    return this.createEnderecoService.createEndereco(
      createEnderecoDto,
      user.id,
    );
  }

  // @Get()
  // findAll() {
  //   return this.enderecoService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.enderecoService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEnderecoDto: UpdateEnderecoDto) {
  //   return this.enderecoService.update(+id, updateEnderecoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.enderecoService.remove(+id);
  // }
}
