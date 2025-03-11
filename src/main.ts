import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  const config = new DocumentBuilder()
    .setTitle('Bereia Livrarias')
    .setDescription('The Bereia Livrarias API description')
    .setVersion('1.0')
    .addTag('Default')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  console.log(`Servidor rodando na porta: ${String(process.env.PORT)}`);
  await app.listen(Number(process.env.PORT));
}
bootstrap();
