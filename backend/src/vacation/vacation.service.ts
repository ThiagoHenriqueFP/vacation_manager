import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Vacation, Vacation_data } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.services';
import { IVacation } from 'src/types/IVacation';

@Injectable()
export class VacationService {
  constructor(private readonly prismaService: PrismaService) { }

  async createVacation({team_id, date_end, date_start, employee_id }: IVacation) {
    const parsedStart = new Date(date_start);
    const parsedEnd = new Date(date_end);

    return await this.prismaService.vacation.create({
      data: {
        date_end: parsedEnd,
        date_start: parsedStart,
        employee_id,
        status: 0,
        team_id,
      }
    });
  }

  async updateSolicitation(id: number,  {date_end, date_start, employee_id, status}:IVacation): Promise<Vacation> {
    if (!status) return;

    if (status < 0) {
      return await this.prismaService.vacation.update({
        where: {
          id
        },
        data: {
          status
        }
      });
    }

    const parsedStart = new Date(date_start);
    const parsedEnd = new Date(date_end);
    const days = (parsedEnd.getTime() - parsedStart.getTime()) / (1000 * 60 * 60 * 24);


    const employeeVacationData = await this.prismaService.vacation_data.findUnique({
      where: {
        employee_id,
      }
    });

    if(days > employeeVacationData.days_remaining)
      throw new HttpException(
        'Date range outside employee days remaining for vacation',
        HttpStatus.BAD_REQUEST
      );

    let fortnigth = false;
    if(days >=15)
      fortnigth = true;

    const vacationData: Vacation_data = {
      days_remaining: employeeVacationData.days_remaining - days,
      date_last_vacation: new Date(),
      employee_id,
      id: employeeVacationData.id,
      fortnigth
    }

    const updateEmployee = await this.prismaService.vacation_data.update({
      where: {
        id
      },
      data: vacationData
    });

    const vacationReturn = await this.prismaService.vacation.update({
      where: { id},
      data: {
        status,
      }
    });

    return {
      ...updateEmployee,
      ...vacationReturn
    }
  }

  async getById(id: number) {
    return await this.prismaService.vacation.findUnique({
      where: {
        id
      }
    });
  }

  async getAllSolicitationsByTeam(team_id: number, check: string): Promise<IVacation[]> {
    if(check === 'false')
      return await this.prismaService.vacation.findMany({
        where: {
          team_id,
        }
      });

    return await this.prismaService.vacation.findMany({
      where: {
        team_id
      },
      include: {
        Employee: {
          select: {
            name: true
          }
        }
      }
    })
  }

  async getSolicitationByTeamAndStatus(team_id: number, status: number, check: string): Promise<IVacation[]> {
    if(check === 'false')
      return await this.prismaService.vacation.findMany({
        where: {
          team_id,
          status
        }
      });

    return await this.prismaService.vacation.findMany({
      where: {
        team_id,
        status,
      },
      include: {
        Employee: {
          select: {
            name: true,
          }
        }
      }
    });
  }

  async deleteSolicittion(id: number): Promise<Vacation> {
    return await this.prismaService.vacation.delete({
      where: {
        id
      }
    });
  }
}