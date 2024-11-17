import { Module } from '@nestjs/common';
import { CriminalModule } from './criminal/criminal.module';

@Module({
  imports: [CriminalModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
