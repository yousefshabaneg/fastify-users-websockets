import { FastifyRequest } from "fastify";
import { IUser } from "../../modules/users/users.model";

declare module "fastify" {
  interface FastifyRequest {
    user?: IUser;
  }
}
