import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { PayloadUserValidate } from 'src/auth_jwt/dto/payload_user_validate.dto';
import { JwtAuthGuard } from 'src/auth_jwt/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { CreateEnderecoService } from './services/createEndereco.service';
import { UpdateAddressService } from './services/updateAddress.service';
import { UpdatePrimaryAddressServices } from './services/updateAddressPrimary.service';

@Controller('endereco')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class EnderecoController {
  constructor(
    private readonly createEnderecoService: CreateEnderecoService,
    private readonly updateEnderecoService: UpdateAddressService,
    private readonly updatePrimaryAdrressService: UpdatePrimaryAddressServices,
  ) {}

  @Post('create')
  @ApiBody({ type: CreateEnderecoDto })
  create(@Body() createEnderecoDto: CreateEnderecoDto) {
    return this.createEnderecoService.createEndereco(createEnderecoDto);
  }

  // @Get()
  // findAll() {
  //   return this.enderecoService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.enderecoService.findOne(+id);
  // }

  @Put('update/:id_address')
  update(
    @Param('id_address') id_address: string,
    @Body() updateEnderecoDto: UpdateEnderecoDto,
  ) {
    return this.updateEnderecoService.updateAddress(
      id_address,
      updateEnderecoDto,
    );
  }
  @Put('update/primaryaddress/:id_address')
  updatePirmaryAddress(@Param('id_address') id_address: string) {
    return this.updatePrimaryAdrressService.updatePrimaryAddress(id_address);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.enderecoService.remove(+id);
  // }
}
