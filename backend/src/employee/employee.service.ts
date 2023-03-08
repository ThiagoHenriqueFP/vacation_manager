import { Injectable } from '@nestjs/common';
import { Employee } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.services';
import { IEmployee } from 'src/types/IEmployee';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) { }

  async createEmployee(data: IEmployee): Promise<Employee> {
    return await this.prisma.employee.create({ data });
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
