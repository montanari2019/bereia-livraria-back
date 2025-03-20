import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { PayloadUserValidate } from 'src/auth_jwt/dto/payload_user_validate.dto';
import { JwtAuthGuard } from 'src/auth_jwt/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { CreateEnderecoService } from './services/createEndereco.service';
import { UpdateAddressService } from './services/updateAddress.service';
import { UpdatePrimaryAddressServices } from './services/updateAddressPrimary.service';
import { MessageResponseDto } from 'src/@types/message-response.dto';
import { FindAllActiveAddressService } from './services/findAllAddress.service';
import { FindAllAddressesDto } from './dto/find-all-address.dto';
import { CustomAuthRequest } from 'src/auth_jwt/interface/custom-request.interface';
import { InactiveAddressServices } from './services/inactiveAddress.service';

@Controller('endereco')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class EnderecoController {
  constructor(
    private readonly createEnderecoService: CreateEnderecoService,
    private readonly updateEnderecoService: UpdateAddressService,
    private readonly updatePrimaryAdrressService: UpdatePrimaryAddressServices,
    private readonly findAllActiveAddressService: FindAllActiveAddressService,
    private readonly inactiveAddressService: InactiveAddressServices,
  ) {}

  @Post('create')
  @ApiBody({ type: CreateEnderecoDto })
  @ApiOkResponse({ type: MessageResponseDto })
  create(@Body() createEnderecoDto: CreateEnderecoDto) {
    return this.createEnderecoService.createEndereco(createEnderecoDto);
  }

  @Get('all')
  @ApiOkResponse({ type: FindAllAddressesDto, isArray: true })
  findAll(@Req() req: CustomAuthRequest) {
    const user_id = req.payload.id;
    return this.findAllActiveAddressService.findAllAddresses(user_id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.enderecoService.findOne(+id);
  // }

  @Put('update/:id_address')
  @ApiOkResponse({ type: MessageResponseDto })
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
  updatePirmaryAddress(
    @Param('id_address') id_address: string,
    @Req() req: CustomAuthRequest,
  ) {
    const user_id = req.payload.id;
    return this.updatePrimaryAdrressService.updatePrimaryAddress(
      id_address,
      user_id,
    );
  }
  @Put('update/inactivate/:id_address')
  updateInactivateAddress(@Param('id_address') id_address: string) {
    return this.inactiveAddressService.inactivaAddress(id_address);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.enderecoService.remove(+id);
  // }
}
