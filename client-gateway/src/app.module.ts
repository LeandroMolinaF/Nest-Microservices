import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CriminalModule } from './criminal/criminal.module';

@Module({
  imports: [CriminalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
