import 'dotenv/config';
import { envSchema } from './schemas';

export { config, Config };

const env = envSchema.parse(process.env);

// Base de donnée
const MONGODB = {
  host: env.MONGODB_URI,
};

const config = {
  mongoDb: MONGODB,
  port: env.PORT,
};

type Config = typeof config;

export default config;
