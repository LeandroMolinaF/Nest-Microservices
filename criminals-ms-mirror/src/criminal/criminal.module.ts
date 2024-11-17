import { Module } from '@nestjs/common';
import { CriminalService } from './criminal.service';
import { CriminalController } from './criminal.controller';

@Module({
  controllers: [CriminalController],
  providers: [CriminalService],
})
export class CriminalModule {}
