import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PayloadUserValidate } from 'src/auth_jwt/dto/payload_user_validate.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.payload as PayloadUserValidate;

    const hasRequiredRole = await this.checkUserRole(user.email, roles);
    if (!hasRequiredRole) {
      throw new UnauthorizedException('Acesso não autorizado.');
    }

    return true;
  }

  async checkUserRole(email: string, roles: string[]): Promise<boolean> {
    const user = await this.prisma.usuario.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return false;
    }

    if (roles.includes(user.roles)) {
      return true;
    }

    return false;
  }
}
