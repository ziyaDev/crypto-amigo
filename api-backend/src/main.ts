import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { ConfigService } from "@nestjs/config";
import { ConfigModule } from "@nestjs/config";

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(
    ConfigModule.forRoot(),
  );
  const configService = appContext.get(ConfigService);

  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors({
    credentials: true,
  });

  await app.listen(configService.get<number>("API_PORT") || 8081);
  console.log(
    `Server running on port ${configService.get<number>("API_PORT") || 8081}`,
  );
}
bootstrap();
