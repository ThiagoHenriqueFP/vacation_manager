import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { AuthModule } from './auth/auth.module';
import { TeamModule } from './team/team.module';
import { VacationModule } from './vacation/vacation.module';

@Module({
  imports: [EmployeeModule, AuthModule, TeamModule, VacationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
