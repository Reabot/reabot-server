import { createParamDecorator } from '@nestjs/common';

const AuthUser = createParamDecorator((data, req) => {
  return req.user;
});

export default AuthUser;
