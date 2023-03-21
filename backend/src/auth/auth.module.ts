import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmployeeModule } from '../employee/employee.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { EmployeeService } from 'src/employee/employee.service';
import { PrismaService } from 'src/services/prisma.services';
import { jwtContants } from './jwtconstants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    EmployeeModule,
    PassportModule,
    JwtModule.register({
        secret: jwtContants.secret,
        signOptions: {expiresIn: '86400s'}
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    EmployeeService,
    PrismaService,
  ]
})
export class AuthModule { }
