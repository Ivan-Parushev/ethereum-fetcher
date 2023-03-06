import { Controller, Get } from '@nestjs/common';
import { Context, ReqContext } from 'src/utils';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  getProfile(@Context() ctx: ReqContext) {
    return ctx.user;
  }

  @Get('my')
  async getMyRequestedTransactions(@Context() ctx: ReqContext) {
    return this.usersService.getMyTransactions(ctx.user.username);
  }
}
