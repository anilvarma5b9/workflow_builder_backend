import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  BadRequestException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserWorkflowService } from './user-workflow.service';
import {
  CreateUserWorkflowSchema,
  UpdateUserWorkflowSchema,
} from './user-workflow.schema';
import { AuthTokenGuard } from 'src/auth/guards/auth_token.guard';
import { XApiKeyGuard } from 'src/auth/guards/x-api-key.guard';

@UseGuards(XApiKeyGuard, AuthTokenGuard)
@Controller('user-workflows')
export class UserWorkflowController {
  constructor(private readonly service: UserWorkflowService) {}

  @Post()
  async create(@Body() body: any) {
    const parsed = CreateUserWorkflowSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.format());
    }
    return this.service.create(parsed.data);
  }

  private parseStatusParam(status?: string): string[] {
    return status
      ? status
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
  }

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    const statusArray = this.parseStatusParam(status);
    return this.service.findAll(search, statusArray);
  }

  @Get('user/:userId')
  async findByUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    const statusArray = this.parseStatusParam(status);
    return this.service.findByUser(userId, search, statusArray);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const parsed = UpdateUserWorkflowSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.format());
    }
    return this.service.update(id, parsed.data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
