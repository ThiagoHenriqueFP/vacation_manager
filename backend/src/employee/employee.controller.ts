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
  async getByIdEmployee(id: number): Promise<Employee> | null {
    return await this.employeeService.getByIdEmployee(id);
  }

  @Post()
  async createEmployee(
    @Body() { date_started, name, password, registration, type }: IEmployee,
  ): Promise<Employee> {
    return await this.employeeService.createEmployee({
      date_started,
      name,
      password,
      registration,
      type,
    });
  }

  @Patch(':id')
  async updateEmployee(
    @Body() { date_started, name, password, registration, type }: IEmployee,
    @Param() id: number,
  ) {
    return await this.employeeService.updateEmployee(id, {
      date_started,
      name,
      password,
      registration,
      type,
    });
  }

  @Delete()
  async deleteEmployee(@Param() id: number) {
    return await this.employeeService.deleteEmployee(id);
  }
}
