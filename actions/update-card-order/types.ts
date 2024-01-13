import { ActionState } from '@/lib/create-safe-action';
import { Card } from '@prisma/client';
import { z } from 'zod';
import { UpdateCardOrderSchema } from './schema';

export type InputType = z.infer<typeof UpdateCardOrderSchema>;
export type ReturnType = ActionState<InputType, Card[]>;
