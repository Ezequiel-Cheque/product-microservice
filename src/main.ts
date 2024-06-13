import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  
  const logger = new Logger('Main');
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: envs.port
      }
    }
  )

  // const app = await NestFactory.create(AppModule);
  
  // const config = new DocumentBuilder()
  //   .setTitle('Products Microservice')
  //   .setDescription('The products microservice')
  //   .setVersion('1.0')
  //   .addTag('Products')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);
  
  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
  );
  await app.listen();
  logger.log(`Products Microservice running on port: ${envs.port}`);
}
bootstrap();
