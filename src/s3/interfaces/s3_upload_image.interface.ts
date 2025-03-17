export interface S3UploadImagemInterface {
  uploadFile: (file: Express.Multer.File) => Promise<{
    urlFile: string;
  }>;
}
