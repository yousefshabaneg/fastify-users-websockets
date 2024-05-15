import { FastifyInstance } from "fastify";
import AuthController from "./auth.controller";

async function authRoutes(app: FastifyInstance) {
  app.post("/signup", AuthController.signup);
  app.post("/login", AuthController.login);
}

export default authRoutes;
