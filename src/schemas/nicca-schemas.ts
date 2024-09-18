import { z } from 'zod';

export const SaurusTypeSchema = z.enum([
  'brachiosaurus',
  'triceratops',
  'pteranodon',
  'tyrannosaurus',
]);

export const WeekSchema = z.object({
  sun: z.boolean(),
  mon: z.boolean(),
  tue: z.boolean(),
  wed: z.boolean(),
  thu: z.boolean(),
  fri: z.boolean(),
  sat: z.boolean(),
});

export const BackendDataSchema = z.object({
  user_id: z.number(),
  achievement_total: z.number().nullable().optional(),
  achievement_dates: z.array(z.string()).nullable().optional(),
  nicca_id: z.number().nullable().optional(),
  title: z.string().nullable().optional(),
  frequency: z.number().nullable().optional(),
  saurus_type: SaurusTypeSchema.nullable().optional(),
  quotient: z.number().nullable().optional(),
});

export const DashboardDataSchema = BackendDataSchema.omit({
  frequency: true,
}).extend({
  week: WeekSchema,
});

export const NiccaSchema = z.object({
  title: z.string(),
  week: WeekSchema,
});

export type SaurusType = z.infer<typeof SaurusTypeSchema>;
export type Week = z.infer<typeof WeekSchema>;
export type ApiResponse = z.infer<typeof BackendDataSchema>;
export type DashboardData = z.infer<typeof DashboardDataSchema>;
export type BackendData = z.infer<typeof BackendDataSchema>;
export type Nicca = z.infer<typeof NiccaSchema>;
