// s3-graph.service.ts
import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { EnvConfigService } from 'src/shared/infraestructure/env_config/env_config.service';
import { S3GraphInterface } from '../interfaces/s3-graph.service.interface';

@Injectable()
export class S3GraphService implements S3GraphInterface {
  private s3: S3Client;
  private bucketName: string;

  constructor(private readonly EnvFile: EnvConfigService) {
    this.s3 = new S3Client({
      region: this.EnvFile.getAwsS3RegionBucket(),
      credentials: {
        accessKeyId: this.EnvFile.getAwsS3AccessIdKey(),
        secretAccessKey: this.EnvFile.getAwsS3SecreteKey(),
      },
    });

    this.bucketName = this.EnvFile.getAwsS3NameBucket();
  }

  getS3Client(): S3Client {
    return this.s3;
  }

  getBucketName(): string {
    return this.bucketName;
  }
}
