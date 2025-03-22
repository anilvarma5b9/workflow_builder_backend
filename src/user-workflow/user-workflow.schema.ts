import { z } from 'zod';

// Enum for Workflow Status
export const WorkflowStatusEnum = z.enum([
  'Pending',
  'Inprogress',
  'Completed',
  'Inactive',
]);

// ✅ Create DTO Schema
export const CreateUserWorkflowSchema = z.object({
  user_id: z.number().int(),
  workflow_name: z.string().min(1, 'Workflow name is required'),
  workflow_description: z.string().optional(),
  workflow_status: WorkflowStatusEnum.default('Pending'),
  nodes_count: z.number().int(),
  edges_count: z.number().int(),
  workflow_data: z.any(),
});

// ✅ Update DTO Schema
export const UpdateUserWorkflowSchema = z.object({
  workflow_name: z.string().min(1, 'Workflow name is required').optional(),
  workflow_description: z.string().optional(),
  workflow_status: WorkflowStatusEnum.optional(),
  nodes_count: z.number().int(),
  edges_count: z.number().int(),
  workflow_data: z.any().optional(),
});

// ✅ Zod Types
export type CreateUserWorkflowDto = z.infer<typeof CreateUserWorkflowSchema>;
export type UpdateUserWorkflowDto = z.infer<typeof UpdateUserWorkflowSchema>;
