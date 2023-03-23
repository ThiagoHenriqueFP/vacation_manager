import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { PrismaService } from 'src/services/prisma.services';

@Module({
  providers: [TeamService, PrismaService],
  controllers: [TeamController]
})
export class TeamModule {}
