import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateUserWorkflowDto,
  UpdateUserWorkflowDto,
} from './user-workflow.schema';
import { BR } from 'src/common_utils/BaseResponse';
import { formatDBDateTime } from 'src/common_utils/DateUtils';

@Injectable()
export class UserWorkflowService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserWorkflowDto) {
    try {
      const created = await this.prisma.userWorkflow.create({
        data: {
          user_id: data.user_id,
          workflow_name: data.workflow_name,
          workflow_description: data.workflow_description || '',
          workflow_status: data.workflow_status,
          workflow_data: data.workflow_data,
          nodes_count: data.nodes_count,
          edges_count: data.edges_count,
        },
      });
      return new BR(
        true,
        'Workflow created successfully',
        '',
        created,
        String(created.workflow_id),
      );
    } catch (error) {
      return new BR(false, 'Failed to create workflow', error.message);
    }
  }

  async findAll(search?: string, status?: string[]) {
    try {
      const filters: any = {};

      if (search) {
        filters.workflow_name = {
          contains: search,
        };
      }

      if (status?.length) {
        filters.workflow_status = {
          in: status,
        };
      }

      const data = await this.prisma.userWorkflow.findMany({
        where: filters,
        orderBy: { added_date_time: 'desc' },
      });

      const data_ = data.map((row) => ({
        ...row,
        added_date_time: formatDBDateTime(row.added_date_time),
        modified_date_time: formatDBDateTime(row.modified_date_time),
      }));

      return new BR(true, 'Workflows fetched successfully', '', data_);
    } catch (error) {
      return new BR(false, 'Failed to fetch workflows', error.message);
    }
  }

  async findByUser(user_id: number, search?: string, status?: string[]) {
    try {
      const filters: any = { user_id };

      if (search) {
        filters.workflow_name = {
          contains: search,
        };
      }

      if (status?.length) {
        filters.workflow_status = {
          in: status,
        };
      }

      const data = await this.prisma.userWorkflow.findMany({
        where: filters,
        orderBy: { added_date_time: 'desc' },
      });

      const data_ = data.map((row) => ({
        ...row,
        added_date_time: formatDBDateTime(row.added_date_time),
        modified_date_time: formatDBDateTime(row.modified_date_time),
      }));

      return new BR(true, 'User workflows fetched successfully', '', data_);
    } catch (error) {
      return new BR(false, 'Failed to fetch user workflows', error.message);
    }
  }

  async findById(workflow_id: number) {
    try {
      const record = await this.prisma.userWorkflow.findUnique({
        where: { workflow_id },
      });

      if (!record) {
        return new BR(false, 'Not found', '');
      }

      return new BR(true, 'Workflow found', '', record);
    } catch (error) {
      return new BR(false, 'Failed to fetch workflow', error.message);
    }
  }

  async update(workflow_id: number, data: UpdateUserWorkflowDto) {
    try {
      const existing = await this.prisma.userWorkflow.findUnique({
        where: { workflow_id },
      });

      if (!existing) {
        throw new NotFoundException('Workflow not found');
      }

      const updated = await this.prisma.userWorkflow.update({
        where: { workflow_id },
        data: {
          workflow_name: data.workflow_name,
          workflow_description: data.workflow_description,
          workflow_status: data.workflow_status,
          workflow_data: data.workflow_data,
          nodes_count: data.nodes_count,
          edges_count: data.edges_count,
        },
      });

      return new BR(
        true,
        'Workflow updated successfully',
        '',
        updated,
        String(updated.workflow_id),
      );
    } catch (error) {
      return new BR(false, 'Failed to update workflow', error.message);
    }
  }

  async delete(workflow_id: number) {
    try {
      const existing = await this.prisma.userWorkflow.findUnique({
        where: { workflow_id },
      });

      if (!existing) {
        throw new NotFoundException('Workflow not found');
      }

      await this.prisma.userWorkflow.delete({ where: { workflow_id } });

      return new BR(true, 'Workflow deleted successfully');
    } catch (error) {
      return new BR(false, 'Failed to delete workflow', error.message);
    }
  }
}
