import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { SignupDto, LoginDto } from './user.schema';
import { AuthService } from '../auth/auth.service';
import { omit } from 'src/common_utils/omit';
import { BR } from 'src/common_utils/BaseResponse';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async signup(data: SignupDto): Promise<BR> {
    try {
      const existing = await this.prisma.user.findUnique({
        where: { email: data.email },
      });
      if (existing) {
        return new BR(false, 'Signup failed! Email already in use');
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
        },
      });

      const userData = omit(user, ['password']);
      const token = this.authService.createToken({
        sub: user.user_id,
        email: user.email,
      });

      return new BR(
        true,
        'Signup successful',
        '',
        { user: userData, access_token: token },
        user.user_id.toString(),
      );
    } catch (error) {
      return new BR(
        false,
        'Signup failed',
        error?.message || 'Something went wrong',
      );
    }
  }

  async login(data: LoginDto): Promise<BR> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      const isValid =
        user && (await bcrypt.compare(data.password, user.password));

      if (!isValid) {
        return new BR(false, 'Invalid credentials');
      }

      const userData = omit(user, ['password']);
      const token = this.authService.createToken({
        sub: user.user_id,
        email: user.email,
      });

      return new BR(
        true,
        'Login successful',
        '',
        { user: userData, access_token: token },
        user.user_id.toString(),
      );
    } catch (error) {
      return new BR(
        false,
        'Login failed',
        error?.message || 'Something went wrong',
      );
    }
  }
}
