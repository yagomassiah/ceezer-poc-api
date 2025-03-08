import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    dotenv.config();

    const app = await NestFactory.create(AppModule);

    // Enable validation pipe with automatic transformation
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );

    // Configure Swagger documentation
    const config = new DocumentBuilder()
        .setTitle('Ceezer Emissions API')
        .setDescription('API for calculating and tracking carbon emissions')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // Enable graceful shutdown
    app.enableShutdownHooks();

    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`🚀 Application is running on: http://localhost:${port}`);
    console.log(
        `📚 API documentation available at: http://localhost:${port}/api`,
    );
}

bootstrap().catch((err) => {
    console.error('Failed to start application:', err);
    process.exit(1);
});
