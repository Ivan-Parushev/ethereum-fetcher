import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AllowUnauthorized } from 'src/utils';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @AllowUnauthorized()
  @UseGuards(LocalAuthGuard)
  @Post('authenticate')
  async login(@Request() req) {
    return this.authService.authenticate(req.user);
  }
}
