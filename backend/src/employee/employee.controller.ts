import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
  async getAllEmployee(): Promise<Employee[]> {
    return await this.employeeService.getAllEmployees();
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
      manager_id
    }: IEmployee,
  ): Promise<Employee> {
    const parsedStart = new Date(date_started);
    const newPasswd = await hashPasswd(password);

    return await this.employeeService.createEmployee({
      date_started: parsedStart,
      name,
      password: newPasswd,
      registration,
      type,
      isManager,
      manager_id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateEmployee(
    @Body() { date_started, name, password, registration, type, isManager, manager_id }: IEmployee,
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
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteEmployee(@Param('id') id: string) {
    return await this.employeeService.deleteEmployee(parseInt(id));
  }
}
