import { z } from 'zod';

export const envSchema = z.object({
  MONGODB_URI: z.string(),
  PORT: z.string(),
});
