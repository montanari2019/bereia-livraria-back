import {
  Controller,
  Delete,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth_jwt/guards/jwt-auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { ROLES_ENUM } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { S3DeleteImagemService } from './services/s3DeleteImage.service';
import { S3UploadImagemService } from './services/s3UploadImage.service';

@Controller('s3')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class S3Controller {
  constructor(
    private readonly s3ServiceUpload: S3UploadImagemService,
    private readonly s3ServiceDelete: S3DeleteImagemService,
  ) {}

  @Post('upload')
  @Roles(ROLES_ENUM.ADMIN)
  @ApiOperation({ summary: 'Faz upload de uma imagem para o S3' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.s3ServiceUpload.uploadFile(file);
  }

  @Delete('delete')
  @Roles(ROLES_ENUM.ADMIN)
  @ApiOperation({ summary: 'Deleta uma imagem do S3 via URL' })
  @ApiQuery({
    name: 'fileUrl',
    type: 'string',
    description: 'URL da imagem no S3',
  })
  async deleteFile(@Query('fileUrl') fileUrl: string) {
    return await this.s3ServiceDelete.deleteFile(fileUrl);
  }
}
