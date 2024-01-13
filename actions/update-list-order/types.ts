import { ActionState } from '@/lib/create-safe-action';
import { List } from '@prisma/client';
import { z } from 'zod';
import { UpdateListOrderSchema } from './schema';

export type InputType = z.infer<typeof UpdateListOrderSchema>;
export type ReturnType = ActionState<InputType, List[]>;
