import { Module } from '@nestjs/common';
import { VacationService } from './vacation.service';
import { VacationController } from './vacation.controller';
import { PrismaService } from 'src/services/prisma.services';

@Module({
  providers: [VacationService, PrismaService],
  controllers: [VacationController]
})
export class VacationModule {}
