import { Controller, Post, Body, Inject } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authCliente: ClientProxy,
  ) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    try {
      const user = await firstValueFrom(
        this.authCliente.send({ cmd: 'login' }, data),
      );
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
