import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('UserService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.user.create({
        data: createUserDto,
      });
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: 'Credenciales duplicadas',
        });
      }
      throw new RpcException(error);
    }
  }

  async findAll() {
    const allUsers = await this.user.findMany();
    return allUsers;
  }

  async findOne(id: number) {
    const criminal = await this.user.findUnique({
      where: { id: id },
    });

    if (!criminal) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: 'El usuario no existe',
      });
    }
    return criminal;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { id: __, ...data } = updateUserDto;
    console.log(__);

    const editedUser = await this.user.update({
      where: { id: id },
      data: data,
    });
    return editedUser;
  }

  async remove(id: number) {
    const eliminatedUser = await this.user.delete({
      where: { id: id },
    });
    return eliminatedUser;
  }
}
