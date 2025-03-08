import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    dotenv.config();
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );

    const config = new DocumentBuilder()
        .setTitle('Emissions API')
        .setDescription('Emissions API description')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    app.enableShutdownHooks();

    console.log(
        `api-${process.env.ENVIRONMENT}@` + process.env.npm_package_version,
    );
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
    console.error('Failed to start application:', err);
    process.exit(1);
});
