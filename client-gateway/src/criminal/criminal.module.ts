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
      {
        name: 'CRIMINAL_SERVICE_MIRROR',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3002 },
      },
    ]),
  ],
})
export class CriminalModule {}
