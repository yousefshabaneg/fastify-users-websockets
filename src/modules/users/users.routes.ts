import { FastifyInstance } from "fastify";
import UserController from "../../modules/users/users.controller";
import AuthMiddleware from "../../modules/auth/auth.middleware";
import {
  AllUserSchema,
  CreateUserSchema,
  DeleteUserSchema,
  UpdateUserSchema,
} from "./users.schemas";

async function userRoutes(app: FastifyInstance) {
  app.addHook("preHandler", AuthMiddleware.protect);
  app.addHook("preHandler", AuthMiddleware.restrictTo("admin"));

  app.get("/", AllUserSchema, UserController.getAllUsers);
  app.post("/", CreateUserSchema, UserController.createUser);
  app.get("/:id", AllUserSchema, UserController.getUser);
  app.patch("/:id", UpdateUserSchema, UserController.updateUser);
  app.delete("/:id", DeleteUserSchema, UserController.deleteUser);
}

export default userRoutes;
