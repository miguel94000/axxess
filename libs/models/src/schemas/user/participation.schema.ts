import { z } from 'zod';

export const ParticipationSchema = z.object({
  loging: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  won: z.boolean(),
  date: z.date(),
});

// Générer le type TypeScript automatiquement
export type ParticipationDTO = z.infer<typeof ParticipationSchema>;
