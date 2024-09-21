import { z } from 'zod';

export const SaurusTypeSchema = z.enum([
  'brachiosaurus',
  'triceratops',
  'pteranodon',
  'tyrannosaurus',
]);

export const WeekSchema = z
  .object({
    sunday: z.boolean(),
    monday: z.boolean(),
    tuesday: z.boolean(),
    wednesday: z.boolean(),
    thursday: z.boolean(),
    friday: z.boolean(),
    saturday: z.boolean(),
  })
  .refine((data) => Object.values(data).filter(Boolean).length >= 4, {
    message: '少なくとも4日以上選択してください',
  });

export const BackendDataSchema = z.object({
  userId: z.number(),
  achievementTotal: z.number().nullable().optional(),
  achievementDates: z.array(z.string()).nullable().optional(),
  niccaId: z.number().nullable().optional(),
  title: z.string().nullable().optional(),
  frequency: z.number().nullable().optional(),
  saurusType: SaurusTypeSchema.nullable().optional(),
  quotient: z.number().nullable().optional(),
  status: z.string().nullable().optional(),
  completedSets: z.number().nullable().optional(),
});

export const DashboardDataSchema = BackendDataSchema.omit({
  frequency: true,
}).extend({
  week: WeekSchema,
});

export const NiccaSchema = z.object({
  title: z.string().min(1, { message: '日課を入力してください' }),
  week: WeekSchema,
});

export type SaurusType = z.infer<typeof SaurusTypeSchema>;
export type Week = z.infer<typeof WeekSchema>;
export type ApiResponse = z.infer<typeof BackendDataSchema>;
export type DashboardData = z.infer<typeof DashboardDataSchema>;
export type BackendData = z.infer<typeof BackendDataSchema>;
export type Nicca = z.infer<typeof NiccaSchema>;
