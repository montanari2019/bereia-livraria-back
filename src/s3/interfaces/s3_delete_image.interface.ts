export interface S3DeleteImagemInterface {
  deleteFile: (url: string) => Promise<any>;
}
