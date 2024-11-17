import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateCriminalDto } from './dto/create-criminal.dto';
import { UpdateCriminalDto } from './dto/update-criminal.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CriminalService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ProductsService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }

  async create(createCriminalDto: CreateCriminalDto) {
    createCriminalDto.name = createCriminalDto.name + '-ms';
    const criminal = await this.criminal.create({
      data: createCriminalDto,
    });

    return criminal;
  }

  async findAll() {
    const allCriminals = await this.criminal.findMany();
    return allCriminals;
  }

  async findOne(id: number) {
    const criminal = await this.criminal.findUnique({
      where: { id: id },
    });

    if (!criminal) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: 'El criminal no existe',
      });
    }
    return criminal;
  }

  async update(id: number, updateCriminalDto: UpdateCriminalDto) {
    const { id: __, ...data } = updateCriminalDto;
    console.log(__);

    const editedCriminal = await this.criminal.update({
      where: { id: id },
      data: data,
    });
    return editedCriminal;
  }

  async remove(id: number) {
    const eliminatedCriminal = await this.criminal.delete({
      where: { id: id },
    });
    return eliminatedCriminal;
  }
}
