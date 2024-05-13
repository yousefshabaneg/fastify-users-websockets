import dotenv from "dotenv";

dotenv.config();

const { API_PORT } = process.env;

export default {
  apiPort: parseInt(API_PORT as string, 10) || 3000,
};
