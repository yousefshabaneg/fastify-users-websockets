import dotenv from "dotenv";

dotenv.config();

const { API_PORT, NODE_ENV, DATABASE_URI } = process.env;

export default {
  apiPort: parseInt(API_PORT as string, 10) || 3000,
  nodeEnv: NODE_ENV?.trim().toLocaleLowerCase() ?? "development",
  dbUri: DATABASE_URI as string,
};
