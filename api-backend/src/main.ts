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

  app.setGlobalPrefix("api");
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    credentials: true,
    origin: configService.get<string>("NEXT_JS_FRONTEND_APP_URL"),
  });

  await app.listen(configService.get<number>("API_PORT") || 8081);
  console.log(
    `Server running on port ${configService.get<number>("API_PORT") || 8081}`,
  );
}
bootstrap();
