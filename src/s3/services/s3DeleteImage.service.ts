import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EnvConfigService } from 'src/shared/infraestructure/env_config/env_config.service';
import { S3DeleteImagemInterface } from '../interfaces/s3_delete_image.interface';
import { S3GraphService } from './s3Graph.service';

@Injectable()
export class S3DeleteImagemService implements S3DeleteImagemInterface {
  constructor(
    private readonly s3GraphService: S3GraphService,
    private readonly EnvFile: EnvConfigService,
  ) {}

  async deleteFile(fileUrl: string) {
    const s3Client = this.s3GraphService.getS3Client();
    const bucketName = this.s3GraphService.getBucketName();
    const region = this.EnvFile.getAwsS3RegionBucket();

    const key = fileUrl.replace(
      `https://${bucketName}.s3.${region}.amazonaws.com/`,
      '',
    );

    const deleteParams = {
      Bucket: bucketName,
      Key: key,
    };

    return await s3Client
      .send(new DeleteObjectCommand(deleteParams))
      .then(() => {
        return {
          mensage: `Imagem deletada com sucesso!`,
        };
      })
      .catch((err) => {
        throw new BadRequestException(['Erro ao deletar imagem', err]);
      });
  }
}
