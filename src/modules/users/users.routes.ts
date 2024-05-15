import { FastifyInstance } from "fastify";
import UserController from "./users.controller";
import AuthMiddleware from "../auth/auth.middleware";

async function userRoutes(app: FastifyInstance) {
  app.addHook("preHandler", AuthMiddleware.protect);
  app.addHook("preHandler", AuthMiddleware.restrictTo("admin"));

  app.get("/", UserController.getAllUsers);
  app.post("/", UserController.createUser);
  app.get("/:id", UserController.getUser);
  app.patch("/:id", UserController.updateUser);
  app.delete("/:id", UserController.deleteUser);
}

export default userRoutes;
