import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('users')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  @Post()
  public async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await firstValueFrom(
        this.userClient.send({ cmd: 'createUser' }, createUserDto),
      );
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  public async findAll() {
    try {
      console.log('Voy a intentar entrae');
      const users = await firstValueFrom(
        this.userClient.send({ cmd: 'findAllUser' }, {}),
      );
      return users;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  public async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await firstValueFrom(
        this.userClient.send({ cmd: 'findOneUser' }, id),
      );
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await firstValueFrom(
        this.userClient.send({ cmd: 'updateUser' }, updateUserDto),
      );
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    try {
      const user = await firstValueFrom(
        this.userClient.send({ cmd: 'removeUser' }, id),
      );
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
