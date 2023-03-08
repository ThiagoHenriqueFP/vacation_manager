import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.services';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, PrismaService],
})
export class EmployeeModule { }
