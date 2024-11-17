import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('AuthService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }

  public async login(data: LoginDto) {
    const user = await this.user.findFirst({
      where: {
        username: data.username,
        password: data.password,
      },
    });
    if (!user) {
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Credenciales no validas',
      });
    }
    return user;
  }
}
