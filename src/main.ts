import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomLogger } from './common/custom-logger.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Pegamos a instância do ConfigService que já foi carregada
  const configService = app.get(ConfigService);

  // Criamos uma instância do nosso logger customizado e passamos o ConfigService
  const logger = new CustomLogger(configService);

  const config = new DocumentBuilder()
    .setTitle('API-Integrador')
    .setDescription('API destinada a integrar SAP e AutoSystem')
    .setVersion('1.0')
    .setExternalDoc('Postman Collection', '/external-api-docs-json')
    .addSecurityRequirements('bearer')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  SwaggerModule.setup('external-api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
