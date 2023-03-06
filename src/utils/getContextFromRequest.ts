import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type User = {
  username: string;
};

export type ReqContext = {
  user: User;
};

export const Context = createParamDecorator((data: unknown, ctx: ExecutionContext): ReqContext => {
  const request = ctx.switchToHttp().getRequest();
  return {
    user: request.user,
  };
});
