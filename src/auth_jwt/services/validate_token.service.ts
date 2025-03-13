import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvConfigService } from 'src/shared/infraestructure/env_config/env_config.service';
import { PayloadUserValidate } from '../dto/payload_user_validate.dto';
import { ValidateTokenInterface } from '../interface/validateToken.interface';

@Injectable()
export class ValidateTokenServices implements ValidateTokenInterface {
  constructor(
    private readonly EnvFile: EnvConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validateToken(token: string): Promise<PayloadUserValidate> {
    try {
      const userPayload = await this.jwtService.verifyAsync(token, {
        secret: this.EnvFile.getHashLoginToken(),
      });

      return userPayload;
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
