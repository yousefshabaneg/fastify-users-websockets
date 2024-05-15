import Fastify from "fastify";
import userRoutes from "./modules/users/users.routes";
import ErrorHandler from "./shared/helpers/error.handler";
import authRoutes from "./modules/auth/auth.routes";

function FastifyServer() {
  const fastify = Fastify({
    logger: true,
  });

  fastify.setErrorHandler(ErrorHandler);

  fastify.register(userRoutes, { prefix: "/users" });
  fastify.register(authRoutes, { prefix: "/auth" });

  return fastify;
}

export default FastifyServer;
