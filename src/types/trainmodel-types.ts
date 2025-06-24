import { z } from 'zod';
export const TYPE = ['MAN', 'WOMAN', 'OTHERS'] as const;
export const ETHINICITY = [
  'ASIAN',
  'BLACK',
  'ASIAN_AMERICAN',
  'WHITE',
  'EAST_ASIAN',
  'SOUTH_EAST_ASIAN',
  'SOUTH_ASIAN',
  'MIDDLE_EASTERN',
  'PACIFIC',
  'HISPANIC',
] as const;
export const EYECOLOR = [
  'BROWN',
  'BLUE',
  'GREEN',
  'GRAY',
  'HAZEL',
  'AMBER',
] as const;

export const TrainModelInput = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(50, {
      message: 'Name must not be longer than 50 characters.',
    }),
  age: z.coerce.number().int().min(1).max(120),
  type: z.enum(TYPE, {
    message: 'Please select a valid type.',
  }),
  ethinicity: z.enum(ETHINICITY, {
    message: 'Please select a valid ethinicity.',
  }),
  eyeColor: z.enum(EYECOLOR, {
    message: 'Please select an eye color.',
  }),
  bald: z.boolean(),
  zipUrl: z.string(),
});
