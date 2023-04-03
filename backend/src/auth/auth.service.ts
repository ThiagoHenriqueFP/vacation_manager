import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
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
    if(!employee) throw new HttpException("Usuário não encontrado", HttpStatus.NOT_FOUND);

    let team;
    if(employee.isManager){
      team = await this.employeeService.getTeams(employee.id);
    } else {
      team = await this.employeeService.getTeams(employee.manager_id);
    }


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

  async verify(token: string) {
    try {
      await this.jwtService.verify(token);
      return true;
    } catch(error) {
      return false;
    }
  }
}
