import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import UserController from "./users.controller";

async function userRoutes(app: FastifyInstance) {
  app.get("/", UserController.getAllUsers);
}

export default userRoutes;
