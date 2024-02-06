import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar títulos de documentación
  //Creación de la configuración de las opciones de presentación de Swagger
  const options = new DocumentBuilder()
    .setTitle('MongoDB Book REST API')
    .setDescription('API REST para libros con MongoDB')
    .setVersion('1.0')
    .build();
  
  //Preparación de la configuración creada para Swagger
  const document = SwaggerModule.createDocument(app, options);

  //La ruta en que corre el proyecto
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
