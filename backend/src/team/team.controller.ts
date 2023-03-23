import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Team } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ITeam } from 'src/types/ITeam';
import { ITeam_employee } from 'src/types/ITeam_employee';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTeams() {
    return await this.teamService.getAllTeams();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTeamById(@Param('id') id: string): Promise<Team | null> {
    return await this.teamService.getTeamById(parseInt(id));
  }

  @UseGuards(JwtAuthGuard)
  @Get('/manager/:manager_id')
  async getTeamByManagerId(@Param('manager_id') id: string): Promise<Team | null> {
    return await this.teamService.getTeamByManagerId(parseInt(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTeam(@Body() { name, sub_team, manager_id}: ITeam): Promise<Team> {
    return await this.teamService.createTeam({name, manager_id, sub_team});
  }

  @Post('/insert')
  async insertOnTeam(@Body() {employee_id, team_id}:ITeam_employee) {
    return await this.teamService.insertOnTeam({employee_id,team_id});
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patchTeam(@Body() { manager_id, name, sub_team}: ITeam, @Param('id') id: string): Promise<Team> {
    return await this.teamService.patchTeam(parseInt(id), {manager_id,name,sub_team});
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTeam(@Param('id') id: string): Promise<Team> {
    return await this.teamService.deleteTeam(parseInt(id));
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/remove/:team_id/:employee_id')
  async removeFromTeam(@Param('team_id') team_id, @Param('employee_id') employee_id) {
    const obj = {
      employee_id:parseInt(employee_id),
      team_id: parseInt(team_id)
    }

    return await this.teamService.removeFromTeam({employee_id,team_id} = obj);
  }
}
