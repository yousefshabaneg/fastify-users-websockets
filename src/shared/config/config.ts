import dotenv from "dotenv";

dotenv.config();

const {
  API_PORT,
  WS_PORT,
  NODE_ENV,
  DATABASE_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
} = process.env;

export default {
  apiPort: parseInt(API_PORT as string, 10) || 3000,
  wsPort: parseInt(WS_PORT as string, 10) || 3030,
  nodeEnv: NODE_ENV?.trim().toLocaleLowerCase() ?? "development",
  dbUri: DATABASE_URI as string,
  jwtSecret: JWT_SECRET || "Secret Key",
  jwtExpiration: JWT_EXPIRES_IN || "7D",
};
