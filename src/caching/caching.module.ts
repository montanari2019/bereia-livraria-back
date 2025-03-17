import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { CachingService } from './caching.service';

@Module({
  providers: [CachingService],
  imports: [CacheModule.register()],
  exports: [CachingService],
})
export class CachingModule {}
