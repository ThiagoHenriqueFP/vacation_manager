import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Design Pattern -> Singleton
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  public prisma: PrismaClient;
  private static instance;

  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  public static getInstance = () => {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaService();
    }
    return PrismaService.instance;
  };

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
