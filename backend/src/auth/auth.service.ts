import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Employee } from '@prisma/client';
import { EmployeeService } from 'src/employee/employee.service';
import { comparePasswd } from 'src/services/bcryptService';

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService
  ) {}

  async loginAuth(registration: string, password: string): Promise<any> {
    const employee = await this.employeeService.getByRegistration(registration);

    if (employee && comparePasswd(password, employee.password)) {
      // const { password, ...result } = employee;
      return await this.genToken(employee);
    }

    throw new UnauthorizedException('Matricula ou senha inválida');
  }

  async genToken(payload: Employee): Promise<any> {
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
