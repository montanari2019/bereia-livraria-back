import { S3Client } from '@aws-sdk/client-s3';

export interface S3GraphInterface {
  getS3Client(): S3Client;
  getBucketName(): string;
}
