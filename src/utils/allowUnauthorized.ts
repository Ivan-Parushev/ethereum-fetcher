import { SetMetadata } from '@nestjs/common';

export const AllowUnauthorized = () => SetMetadata('allowUnauthorizedRequest', true);
