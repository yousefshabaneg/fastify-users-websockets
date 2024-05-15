import { FastifyInstance } from "fastify";
import AuthController from "./auth.controller";

const SignupSchema = {
  schema: {
    body: {
      role: { type: "string" },
      name: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
    },
    required: ["name", "email", "password"],
    tags: ["Auth"],
  },
};

const LoginSchema = {
  schema: {
    body: {
      email: { type: "string" },
      password: { type: "string" },
    },
    required: ["email", "password"],

    tags: ["Auth"],
  },
};

async function authRoutes(app: FastifyInstance) {
  app.post("/signup", SignupSchema, AuthController.signup);
  app.post("/login", LoginSchema, AuthController.login);
}

export default authRoutes;
