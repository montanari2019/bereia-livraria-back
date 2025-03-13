import { SetMetadata } from '@nestjs/common';
import { ROLES_ENUM } from './roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ROLES_ENUM[]) => SetMetadata(ROLES_KEY, roles);
