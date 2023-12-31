import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  jwt: { secret_key: process.env.SECRET_KEY },
};
