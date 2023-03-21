import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Employee } from '@prisma/client';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Body() {registration, password}: Employee) {
    return this.authService.loginAuth(registration, password)
  }
}
