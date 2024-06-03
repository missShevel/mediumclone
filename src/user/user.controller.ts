import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/login.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from './decorators/user.decorator';
import { UserEntity } from './user.entity';

@Controller()
export class UserController {
  constructor(private readonly UserService: UserService) {}
  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.UserService.createUser(createUserDto);
    return this.UserService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.UserService.login(loginUserDto);
    return this.UserService.buildUserResponse(user);
  }

  @Get('user')
  async currentUser(
    @User() user: UserEntity,
    @User('id') currentUserId: number
  ): Promise<UserResponseInterface> {
    return this.UserService.buildUserResponse(user);
  }
}
