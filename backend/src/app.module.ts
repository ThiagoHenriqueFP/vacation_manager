import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { AuthModule } from './auth/auth.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [EmployeeModule, AuthModule, TeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
