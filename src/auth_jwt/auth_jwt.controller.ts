import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthenticationServices } from './services/authentication_session.service';

@ApiTags('Authenticated')
@Controller('authjwt')
export class AuthJwtController {
  constructor(
    private readonly AuthenticatedJwtService: AuthenticationServices,
  ) {}

  @Post('login')
  async create(@Body() createAuthJwtDto: LoginDto) {
    return await this.AuthenticatedJwtService.authenticatedLogin(
      createAuthJwtDto.email,
      createAuthJwtDto.password,
    );
  }
  @Post('validate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  validate(@Req() request) {
    return request.payload;
  }
}
