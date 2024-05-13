import Fastify, { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./modules/users/users.routes";
import AppError from "./shared/helpers/AppError";
import ErrorHandler from "./shared/helpers/error.handler";

function FastifyServer() {
  const fastify = Fastify({
    logger: true,
  });

  fastify.setErrorHandler(ErrorHandler);

  fastify.register(userRoutes, { prefix: "/users" });

  return fastify;
}

export default FastifyServer;
