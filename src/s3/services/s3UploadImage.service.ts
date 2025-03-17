import { Injectable } from '@nestjs/common';
import { S3UploadImagemInterface } from '../interfaces/s3_upload_image.interface';
import { S3GraphService } from './s3Graph.service';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { EnvConfigService } from 'src/shared/infraestructure/env_config/env_config.service';
import * as path from 'path';

@Injectable()
export class S3UploadImagemService implements S3UploadImagemInterface {
  constructor(
    private readonly s3GraphService: S3GraphService,
    private readonly EnvFile: EnvConfigService,
  ) {}

  async uploadFile(file: Express.Multer.File) {
    const fileName = `${crypto.randomUUID()}${path.extname(file.originalname)}`;

    const s3Client = this.s3GraphService.getS3Client();
    const bucketName = this.s3GraphService.getBucketName();

    const uploadParams = {
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    return {
      urlFile: `https://${bucketName}.s3.${this.EnvFile.getAwsS3RegionBucket()}.amazonaws.com/${fileName}`,
    };
  }
}
