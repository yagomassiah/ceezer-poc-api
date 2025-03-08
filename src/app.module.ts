import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users/users.controller';
import { EmissionsService } from './services/emissions.service';
import { EmissionsController } from './controllers/emissions/emissions.controller';

@Module({
    imports: [PrismaModule],
    controllers: [UsersController, EmissionsController],
    providers: [AppService, UsersService, EmissionsService],
})
export class AppModule {}
