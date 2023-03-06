import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Context, ReqContext } from 'src/utils';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Context() ctx: ReqContext) {
    return ctx.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getMyRequestedTransactions(@Context() ctx: ReqContext) {
    return this.usersService.getMyTransactions(ctx.user.username);
  }
}
