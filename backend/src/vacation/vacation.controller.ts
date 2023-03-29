import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Vacation } from '@prisma/client';
import { IVacation } from 'src/types/IVacation';
import { VacationService } from './vacation.service';

@Controller('vacation')
export class VacationController {
  constructor(private vacationService: VacationService) {}

  @Post()
  async createSolicitaion(@Body() vacation: IVacation): Promise<Vacation> {
    return await this.vacationService.createVacation(vacation);
  }

  @Get(':id')
  async getSolicitationById(@Param('id') id: string) {
    return await this.vacationService.getById(parseInt(id));
  }

  @Get('/team/:team_id')
  async getAllSolicitation(
    @Param('team_id') team_id: string, @Query('employees') check: string
    ): Promise<IVacation[]>{
    return await this.vacationService.getAllSolicitationsByTeam(parseInt(team_id), check);
  }

  @Get(':team_id/:status')
  async getSolicitationByStatus(
    @Param('team_id') team_id: string,
    @Param('status') status: string,
    @Query('employees') check: string
    ) {
    return await this.vacationService.getSolicitationByTeamAndStatus(
      parseInt(team_id),
      parseInt(status),
      check
    );
  }

  @Patch(':id')
  async patchSolicitation(@Param('id') id: string, @Body() vacation: IVacation){
    return await this.vacationService.updateSolicitation(
      parseInt(id),
      vacation
    );
  }

  @Delete(':id')
  async removeSolicitation(@Param('id') id:string) {
    return await this.vacationService.deleteSolicitation(parseInt(id));
  }
}
