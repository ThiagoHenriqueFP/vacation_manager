import { Injectable } from '@nestjs/common';
import { Employee } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.services';
import { IEmployee } from 'src/types/IEmployee';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) { }

  async createEmployee(employeeData: IEmployee): Promise<Employee> {
    // create dto's
    const data = {
      ...employeeData,
      vacation_data: {
        create: {
          days_remaining: 30,
          date_last_vacation: null,
          fortnigth: false
        }
      }
    }

    const employee = await this.prisma.employee.create({ data });
    return employee;
  }

  async updateEmployee(id: number, data: IEmployee): Promise<Employee> {
    return await this.prisma.employee.update({
      where: {
        id,
      },
      data,
    });
  }

  async getAllEmployees(): Promise<Employee[]> {
    return await this.prisma.employee.findMany();
  }

  async getByIdEmployee(id: number): Promise<Employee> | null {
    return await this.prisma.employee.findUnique({ where: { id } });
  }

  async deleteEmployee(id: number): Promise<Employee> | null {
    return await this.prisma.employee.delete({ where: { id } });
  }
}
