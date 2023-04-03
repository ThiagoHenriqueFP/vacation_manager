import { Injectable } from '@nestjs/common';
import { Employee } from '@prisma/client';
import { hashPasswd } from 'src/services/bcryptService';
import { PrismaService } from 'src/services/prisma.services';
import { IEmployee, IUpdateEmployee } from 'src/types/IEmployee';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) { }

  async createEmployee(employeeData: IEmployee): Promise<Employee> {
    // create dto's
    const {id, manager_id,...rest} = employeeData;
    const data = {
      ...rest,
      vacation_data: {
        create: {
          days_remaining: 30,
          date_last_vacation: null,
          fortnigth: false
        }
      }
    }

    if(manager_id){
      const team = await this.prisma.team.findUnique({
        where: {
          manager_id: employeeData.manager_id
        }
      });

      const employee = await this.prisma.employee.create({
        data: {
          ...data,
          manager_id,
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

  async updateEmployee(id: number, data: IUpdateEmployee): Promise<Employee> {
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

  async getByStatusAndTeam(status: string, manager_id: number, count = 'false') {
    if(count === 'true') {
      const data = await this.prisma.employee.groupBy({
        by: ['status'],
        where: {
          manager_id,
          status: status === 'true',
        },
        _count: true,
      });

      return data;
    }
    const statusData = status === 'true';
    return await this.prisma.employee.findMany({
      where: {
        manager_id,
        status: statusData,
      }
    });
  }

  async getTeams(manager_id: number): Promise<any> | null {
    return await this.prisma.team.findUnique({
      where: {
        manager_id
      }
    });
  }

  async getVacationData(id: number) {
    const data = await this.prisma.vacation_data.findMany({
      where: {
        employee_id: id,
      }
    });

    return data[0];
  }

  async deleteEmployee(id: number): Promise<Employee> | null {
    await this.prisma.vacation_data.delete({
      where: {
        employee_id: id,
      }
    });

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
