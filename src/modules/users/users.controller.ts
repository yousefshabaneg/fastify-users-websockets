import { FastifyReply, FastifyRequest } from "fastify";
import catchAsync from "../../shared/helpers/catchAsync";

class UserController {
  static getAllUsers = catchAsync(
    async (req: FastifyRequest, reply: FastifyReply) => {
      const allUsers = [{ id: 1, name: "Youssef" }];
      return reply.code(200).send({ users: allUsers });
    }
  );
}

export default UserController;
