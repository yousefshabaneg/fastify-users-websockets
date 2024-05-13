import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import UserController from "./users.controller";

async function userRoutes(app: FastifyInstance) {
  app.get("/", UserController.getAllUsers);
  app.post("/", UserController.createUser);
  app.get("/:id", UserController.getUser);
  app.patch("/:id", UserController.updateUser);
  app.delete("/:id", UserController.deleteUser);
}

export default userRoutes;
