import { Module } from '@nestjs/common';
import { CriminalController } from './criminal.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [CriminalController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: 'CRIMINAL_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3001 },
      },
    ]),
  ],
})
export class CriminalModule {}
