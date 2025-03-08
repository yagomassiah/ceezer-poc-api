import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '@/services/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // @Post()
    // create(@Body() createUserDto: CreateUserDto) {
    //     return this.usersService.create(createUserDto);
    // }

    @Get('/')
    async findAll(): Promise<Record<string, any>> {
        try {
            const users = await this.usersService.findAll();
            return users;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                'Error fetching users',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
