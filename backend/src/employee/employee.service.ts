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

    if(employeeData.manager_id){

      const team = await this.prisma.team.findUnique({
        where: {
          manager_id: employeeData.manager_id
        }
      });

      const employee = await this.prisma.employee.create({
        data: {
          ...data,
          team_employee: {
            create: {
              team_id: team.id
            }
          }
        }
       });
      return employee;
    }

    return await this.prisma.employee.create({
      data
    });

  }

  async updateEmployee(id: number, data: IEmployee): Promise<Employee> {
    const {date_started, ...rest} = data;
    return await this.prisma.employee.update({
      where: {
        id,
      },
      data: {
        ...rest,
        date_started: new Date(date_started)
      }
    });
  }

  async getAllEmployees(query?: string): Promise<Employee[]> {
    if (!query)
      return await this.prisma.employee.findMany();

      return await this.prisma.employee.findMany({
        where: {
          registration: {
            contains: query
          }
        }
      });
  }

  async getByIdEmployee(id: number): Promise<Employee> | null {
    return await this.prisma.employee.findUnique({ where: { id } });
  }

  async getByRegistration(registration: string): Promise<Employee> | null {
    return await this.prisma.employee.findUnique({ where: { registration }});
  }

  async getTeams(manager_id: number): Promise<any> | null {
    return await this.prisma.team.findUnique({
      where: {
        manager_id
      }
    });
  }

  async deleteEmployee(id: number): Promise<Employee> | null {
    return await this.prisma.employee.delete({
      where: { id }
    });
  }

  async updateStatus(id: number, data) {
    const { status } = data
    return this.prisma.employee.update({
      where: {
        id
      },
      data:{
        status
      }
    });
  }
}
