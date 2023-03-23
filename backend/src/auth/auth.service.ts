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
    const team = await this.employeeService.getTeams(employee.id);
    if (employee && await comparePasswd(password, employee.password)) {
      const { access_token } = await this.genToken(employee);
      const { password, ...rest } = employee;

      const response = {
        access_token,
        employee: rest,
        team
      }

      return response;
    }

    throw new UnauthorizedException('Matricula ou senha inválida');
  }

  async genToken(payload: Employee) {
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
