import { FastifyReply, FastifyRequest } from "fastify";
import ApiStatus from "../../shared/types/apiStatus.enum";
import UserModel, { IUser } from "../users/users.model";

class AuthController {
  static login = async (req: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = req.body as any;

    const user: IUser = await UserModel.login(email, password);
    const token = await user.generateToken();

    return reply.code(200).send({
      status: "success",
      message: "User logged successfully",
      token,
      data: user,
    });
  };

  static signup = async (req: FastifyRequest, reply: FastifyReply) => {
    const newUser = await UserModel.create(req.body);
    return reply.code(201).send({
      status: ApiStatus.SUCCESS,
      data: newUser,
    });
  };
}

export default AuthController;
