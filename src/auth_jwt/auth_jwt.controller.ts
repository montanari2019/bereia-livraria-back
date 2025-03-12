import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthJwtService } from './auth_jwt.service';
import { CreateAuthJwtDto } from './dto/create-auth_jwt.dto';
import { UpdateAuthJwtDto } from './dto/update-auth_jwt.dto';
import { LoginDto } from './dto/login.dto';
import { AuthenticationServices } from './services/authentication_session.service';
import { ValidateTokenServices } from './services/validate_token.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authenticated')
@Controller('authjwt')
export class AuthJwtController {
  constructor(
    private readonly AuthenticatedJwtService: AuthenticationServices,
    private readonly ValidateToken: ValidateTokenServices,
  ) {}

  @Post('login')
  async create(@Body() createAuthJwtDto: LoginDto) {
    return await this.AuthenticatedJwtService.authenticatedLogin(
      createAuthJwtDto.email,
      createAuthJwtDto.password,
    );
  }
  @Post('validate')
  valdiate(@Body() body: CreateAuthJwtDto) {
    return this.ValidateToken.validateToken(body.access_token);
  }
}
