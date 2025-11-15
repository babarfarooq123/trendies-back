import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';

@Controller('users')
export class UsersController {
    @Post('/signup')
    create(
        @Body() createUserDto: CreateUserDto,
    ) {
        // Handle user creation logic here
        return createUserDto;
    }
}
