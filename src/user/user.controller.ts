import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupSchema, LoginSchema } from './user.schema';

@Controller('user/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() body: any) {
    const parsed = SignupSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.format());
    }

    return this.userService.signup(parsed.data);
  }

  @Post('login')
  async login(@Body() body: any) {
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.format());
    }

    return this.userService.login(parsed.data);
  }
}
