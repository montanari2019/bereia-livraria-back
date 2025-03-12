import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvConfigService } from 'src/shared/infraestructure/env_config/env_config.service';
import { CreateAuthJwtDto } from '../dto/create-auth_jwt.dto';
import { GenerateTokenInterface } from '../interface/generateToken.interface';

@Injectable()
export class GenerateTokenService implements GenerateTokenInterface {
  constructor(
    private readonly envConfigService: EnvConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async generateToken(
    payload: any,
    expiresIn: string,
  ): Promise<CreateAuthJwtDto> {
    const secretKey = this.envConfigService.getHashLoginToken();
    if (!secretKey) {
      throw new Error('JWT secret key is not defined');
    }

    const accessToken = this.jwtService.sign(payload, {
      expiresIn,
      algorithm: 'HS256',
      secret: secretKey,
    });

    return { access_token: accessToken };
  }
}
