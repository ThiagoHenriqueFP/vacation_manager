import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Employee } from '@prisma/client';
import { hashPasswd } from 'src/services/bcryptService';
import { IEmployee } from 'src/types/IEmployee';
import { EmployeeService } from './employee.service';

@Controller('/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Get()
  async getAllEmployee(): Promise<Employee[]> {
    return await this.employeeService.getAllEmployees();
  }

  @Get(':id')
  async getByIdEmployee(@Param('id') id: string): Promise<Employee> | null {
    return await this.employeeService.getByIdEmployee(parseInt(id));
  }

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

  @Patch(':id')
  async updateEmployee(
    @Body() { date_started, name, password, registration, type }: IEmployee,
    @Param('id') id: string,
  ) {
    return await this.employeeService.updateEmployee(parseInt(id), {
      date_started,
      name,
      password,
      registration,
      type,
    });
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id: string) {
    return await this.employeeService.deleteEmployee(parseInt(id));
  }
}
