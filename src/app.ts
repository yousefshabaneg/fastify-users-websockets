import Fastify from "fastify";
import userRoutes from "./modules/users/users.routes";

function FastifyServer() {
  const fastify = Fastify();
  fastify.register(userRoutes, { prefix: "/users" });

  return fastify;
}

export default FastifyServer;
