import { z } from 'zod';

export const ParticipationScratchedSchema = z.object({
  id: z.string(),
  scratched: z.string(),
});

export type ParticipationScratchedDTO = z.infer<
  typeof ParticipationScratchedSchema
>;
