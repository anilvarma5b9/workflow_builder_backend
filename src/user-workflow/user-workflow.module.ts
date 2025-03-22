import { Module } from '@nestjs/common';
import { UserWorkflowService } from './user-workflow.service';
import { UserWorkflowController } from './user-workflow.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [UserWorkflowService],
  controllers: [UserWorkflowController],
})
export class UserWorkflowModule {}
