import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvConfigService } from 'src/shared/infraestructure/env_config/env_config.service';

@Injectable()
export class ValidateTokenServices implements ValidateTokenServices {
  constructor(
    private readonly EnvFile: EnvConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validateToken(token: string): Promise<any> {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: this.EnvFile.getHashLoginToken(),
      });

      return;
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
