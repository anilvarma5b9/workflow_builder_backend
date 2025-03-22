import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserWorkflowModule } from './user-workflow/user-workflow.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.AUTH_JWT_TOKEN_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    UserWorkflowModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
