import Fastify from "fastify";
import { join } from "path";
import userRoutes from "./modules/users/users.routes";
import ErrorHandler from "./shared/helpers/error.handler";
import authRoutes from "./modules/auth/auth.routes";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import config from "./shared/config/config";
import fastifyAutoload from "@fastify/autoload";

async function FastifyServer() {
  const fastify = Fastify({
    logger: true,
  });

  fastify.setErrorHandler(ErrorHandler);

  // Register Swagger
  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: "User Directory and Profile",
        description:
          "Demonstrates Fastify with authenticated route using RSA256",
        version: "1.0.0",
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            description:
              "RSA256 JWT signed by private key, with username in payload",
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },

      tags: [
        {
          name: "Users",
          description: "Users CRUD endpoints",
        },

        {
          name: "Auth",
          description: "Auth LOGIN/SIGNUP",
        },
      ],
    },
  });

  await fastify.register(fastifySwaggerUI, {
    routePrefix: "/documentation",
  });

  await fastify.register(userRoutes, { prefix: "/users" });
  await fastify.register(authRoutes, { prefix: "/auth" });

  return fastify;
}

export default FastifyServer;
