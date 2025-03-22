import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { XApiKeyGuard } from './guards/x-api-key.guard';
import { AuthTokenGuard } from './guards/auth_token.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.AUTH_JWT_TOKEN_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, AuthTokenGuard, XApiKeyGuard],
  exports: [AuthService, AuthTokenGuard, XApiKeyGuard, JwtModule],
})
export class AuthModule {}
