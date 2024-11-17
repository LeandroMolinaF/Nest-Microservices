import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateCriminalDto } from './dto/create-criminal.dto';
import { UpdateCriminalDto } from './dto/update-criminal.dto';

@Controller('criminals')
export class CriminalController {
  constructor(
    @Inject('CRIMINAL_SERVICE') private readonly criminalClient: ClientProxy,
    @Inject('CRIMINAL_SERVICE_MIRROR')
    private readonly criminalClientMirror: ClientProxy,
  ) {}

  @Post()
  public async create(@Body() newCriminal: CreateCriminalDto) {
    try {
      const criminal = await firstValueFrom(
        this.criminalClient.send({ cmd: 'createCriminal' }, newCriminal),
      );
      return criminal;
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        return this.criminalClientMirror
          .send({ cmd: 'createCriminal' }, newCriminal)
          .pipe(
            catchError((err) => {
              throw new RpcException(err);
            }),
          );
      }
      throw new RpcException(error);
    }
  }

  @Get()
  public async findAll() {
    try {
      const criminals = await firstValueFrom(
        this.criminalClient.send({ cmd: 'findAllCriminal' }, {}),
      );
      return criminals;
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        return this.criminalClientMirror
          .send({ cmd: 'findAllCriminal' }, {})
          .pipe(
            catchError((err) => {
              throw new RpcException(err);
            }),
          );
      }

      throw new RpcException(error);
    }
  }

  @Get(':id')
  public async findOne(@Param('id') id: number) {
    return this.criminalClient.send({ cmd: 'findOneCriminal' }, { id }).pipe(
      catchError((err) => {
        if (err.code === 'ECONNREFUSED') {
          return this.criminalClientMirror
            .send({ cmd: 'findOneCriminal' }, { id })
            .pipe(
              catchError((err) => {
                throw new RpcException(err);
              }),
            );
        }
        throw new RpcException(err);
      }),
    );
    /**try {
      const criminal = await firstValueFrom(
        this.criminalClient.send({ cmd: 'findOneCriminal' }, { id }),
      );
      return criminal;
    } catch (error) {
      throw new RpcException(error);
    }*/
  }

  @Patch(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCriminalDto,
  ) {
    try {
      const criminal = await firstValueFrom(
        this.criminalClient.send({ cmd: 'updateCriminal' }, data),
      );
      return criminal;
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        return this.criminalClientMirror
          .send({ cmd: 'updateCriminal' }, data)
          .pipe(
            catchError((err) => {
              throw new RpcException(err);
            }),
          );
      }
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  public async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const criminal = await firstValueFrom(
        this.criminalClient.send({ cmd: 'removeCriminal' }, id),
      );
      return criminal;
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        return this.criminalClientMirror
          .send({ cmd: 'removeCriminal' }, id)
          .pipe(
            catchError((err) => {
              throw new RpcException(err);
            }),
          );
      }
      throw new RpcException(error);
    }
  }
}
