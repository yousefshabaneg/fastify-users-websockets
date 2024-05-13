import { FastifyReply, FastifyRequest } from "fastify";
import AppError from "../../shared/helpers/AppError";

class UserController {
  static getAllUsers = async (req: FastifyRequest, reply: FastifyReply) => {
    const allUsers = [{ id: 1, name: "Youssef" }];
    return reply.code(200).send({ users: allUsers });
  };
}

export default UserController;
