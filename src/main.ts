import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
  process.exit(1);
});
