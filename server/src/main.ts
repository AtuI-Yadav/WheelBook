import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/graphql');
    Logger.log('Listening at http://localhost:' + port);
  });
}
bootstrap();
