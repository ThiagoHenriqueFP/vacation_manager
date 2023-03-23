import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Team, Team_employee } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.services';
import { ITeam } from 'src/types/ITeam';
import { ITeam_employee } from 'src/types/ITeam_employee';

@Injectable()
export class TeamService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllTeams(): Promise<Team[]> {
    return await this.prismaService.team.findMany();
  }

  async getTeamByManagerId(manager_id: number): Promise<Team | null> {
    return await this.prismaService.team.findUnique({
      where:{
        manager_id
      }
    });
  }

  async getTeamById(id: number): Promise<Team> {
    return await this.prismaService.team.findUnique({
      where: {
        id
      },
      include: {
        team_employee: {
          include: {
            employee: true
          }
        }
      }
    });
  }

  async createTeam({name, sub_team, manager_id}: ITeam): Promise<Team> {
    return await this.prismaService.team.create({
      data: {
        name,
        sub_team,
        manager_id
      }
    });
  }

  async insertOnTeam({team_id, employee_id}: ITeam_employee): Promise<Team_employee> {
    return await this.prismaService.team_employee.create({
      data: {
        employee_id,
        team_id
      }
    });
  }

  async patchTeam(id: number, {name, sub_team, manager_id}): Promise<Team> {
    return await this.prismaService.team.update({
      where: {
        id
      },
      data: {
        name,
        sub_team,
        manager_id
      }
    });
  }

  async deleteTeam(id: number): Promise<Team> {
    return await this.prismaService.team.delete({
      where: { id }
    });
  }

  async removeFromTeam({employee_id, team_id}: ITeam_employee) {

    const employee = await this.prismaService.employee.findUnique({
      where: {
        id: employee_id
      }
    });

    const team = await this.prismaService.team.findUnique({
      where: {
        id: team_id,
      }
    });

    if(!employee)
      throw new HttpException('Employee not found, check the id', HttpStatus.NOT_FOUND)

    if(!team)
      throw new HttpException('Team not found, check the id', HttpStatus.NOT_FOUND)

    const employeeOnTeam = await this.prismaService.team_employee.delete({
      where: {
        team_id_employee_id: {
          employee_id,
          team_id,
        }
      }
    });

    if(!employeeOnTeam)
      throw new HttpException('Employee not in this team', HttpStatus.BAD_REQUEST);
  }

}
