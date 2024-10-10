import { WeekSchema } from '@/schemas/nicca/nicca-schemas';
import { z } from 'zod';

export type ApiResult<T> =
  | { success: true; data: T; status: number }
  | { success: false; error: string; status: number };

export type Week = z.infer<typeof WeekSchema>;
