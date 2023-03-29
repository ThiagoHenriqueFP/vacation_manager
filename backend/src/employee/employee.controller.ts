import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Employee } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { hashPasswd } from 'src/services/bcryptService';
import { IEmployee } from 'src/types/IEmployee';
import { EmployeeService } from './employee.service';

@Controller('/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllEmployee(@Query('search') search): Promise<Employee[]> {
    return await this.employeeService.getAllEmployees(search);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getByIdEmployee(@Param('id') id: string): Promise<Employee> | null {
    return await this.employeeService.getByIdEmployee(parseInt(id));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':registration')
  async getByRegistrationEmployee(@Param('registration') registration: string): Promise<Employee> | null {
    return await this.employeeService.getByRegistration(registration);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createEmployee(
    @Body() { date_started,
      name,
      password,
      registration,
      type,
      isManager,
      manager_id,
      role,
      status
    }: IEmployee,
  ): Promise<Employee> {
    const parsedStart = new Date(date_started);
    let newPasswd: string;
    if(password){
      newPasswd = await hashPasswd(password);
    } else {
      newPasswd = await hashPasswd(registration);
    }

    return await this.employeeService.createEmployee({
      date_started: parsedStart,
      name,
      password: newPasswd,
      registration,
      type,
      isManager,
      manager_id,
      role,
      status
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateEmployee(
    @Body() { date_started, name, password, registration, type, isManager, manager_id, role, status }: IEmployee,
    @Param('id') id: string,
  ) {
    return await this.employeeService.updateEmployee(parseInt(id), {
      date_started,
      name,
      password,
      registration,
      type,
      isManager,
      manager_id,
      role,
      status,
    });
  }


  @Patch('/status/:id')
  async patchTest(@Param('id') id: string, @Body() status: boolean) {
    return await this.employeeService.updateStatus(parseInt(id), status);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteEmployee(@Param('id') id: string) {
    return await this.employeeService.deleteEmployee(parseInt(id));
  }
}
