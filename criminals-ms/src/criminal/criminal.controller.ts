import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CriminalService } from './criminal.service';
import { CreateCriminalDto } from './dto/create-criminal.dto';
import { UpdateCriminalDto } from './dto/update-criminal.dto';

@Controller()
export class CriminalController {
  constructor(private readonly criminalService: CriminalService) {}

  @MessagePattern({ cmd: 'createCriminal' })
  create(@Payload() createCriminalDto: CreateCriminalDto) {
    return this.criminalService.create(createCriminalDto);
  }

  @MessagePattern({ cmd: 'findAllCriminal' })
  findAll() {
    return this.criminalService.findAll();
  }

  @MessagePattern({ cmd: 'findOneCriminal' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.criminalService.findOne(id);
  }

  @MessagePattern({ cmd: 'updateCriminal' })
  update(@Payload() updateCriminalDto: UpdateCriminalDto) {
    return this.criminalService.update(updateCriminalDto.id, updateCriminalDto);
  }

  @MessagePattern({ cmd: 'removeCriminal' })
  remove(@Payload() id: number) {
    return this.criminalService.remove(id);
  }
}
