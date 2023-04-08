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
  async getAllEmployee(@Query('search') search: string): Promise<Employee[]> {
    return await this.employeeService.getAllEmployees(search);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getByIdEmployee(@Param('id') id: string): Promise<Employee> | null {
    return await this.employeeService.getByIdEmployee(parseInt(id));
  }

  @UseGuards(JwtAuthGuard)
  @Get('/registration/:registration')
  async getByRegistrationEmployee(@Param('registration') registration: string): Promise<Employee> | null {
    return await this.employeeService.getByRegistration(registration);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/status/:status/:manager_id')
  async getByStatus(
    @Param('status') status,
    @Param('manager_id') manager_id,
    @Query('count') count
  ) {
    return await this.employeeService.getByStatusAndTeam(status, parseInt(manager_id), count);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/vacation-data/:employee_id')
  async getByEmployee (@Param('employee_id') employee_id){
    return await this.employeeService.getVacationData(parseInt(employee_id));
  }

  @Post()
  async createEmployee(
    @Body() employeeData: IEmployee,
  ): Promise<Employee> {
    const parsedStart = new Date(employeeData.date_started);
    let newPasswd: string;
    if(employeeData.password){
      newPasswd = await hashPasswd(employeeData.password);
    } else {
      newPasswd = await hashPasswd(employeeData.registration);
    }

    const {date_started, password, ...rest} = employeeData;
    return await this.employeeService.createEmployee({
      date_started: parsedStart,
      password: newPasswd,
      ...rest,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateEmployee(
    @Body() employeeData: IEmployee,
    @Param('id') id: string,
  ) {
    const {password, ...rest} = employeeData;
    return await this.employeeService.updateEmployee(parseInt(id), {
      ...rest
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
