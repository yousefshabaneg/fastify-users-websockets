import { FastifyReply, FastifyRequest } from "fastify";
import UserModel, { IUser } from "./users.model";
import ApiStatus from "../../shared/types/apiStatus.enum";
import AppError from "../../shared/helpers/AppError";

type UserParamsSchema = { Params: { id: string } };
type UpdateUserSchema = {
  Params: { id: string };
  Body: IUser;
};

class UserController {
  static getAllUsers = async (req: FastifyRequest, reply: FastifyReply) => {
    const allUsers = await UserModel.find();
    return reply.code(200).send({
      status: ApiStatus.SUCCESS,
      data: allUsers,
    });
  };

  static getUser = async (
    req: FastifyRequest<UserParamsSchema>,
    reply: FastifyReply
  ) => {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (!user) throw AppError.NotFoundException("This user doest not exist");

    return reply.code(200).send({
      status: ApiStatus.SUCCESS,
      data: user,
    });
  };

  static createUser = async (req: FastifyRequest, reply: FastifyReply) => {
    const newUser = await UserModel.create(req.body);
    return reply.code(201).send({
      status: ApiStatus.SUCCESS,
      data: newUser,
    });
  };

  static updateUser = async (
    req: FastifyRequest<UpdateUserSchema>,
    reply: FastifyReply
  ) => {
    const { id } = req.params;

    const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!user) throw AppError.NotFoundException("This user doest not exist");

    return reply.code(200).send({
      status: ApiStatus.SUCCESS,
      data: user,
    });
  };

  static deleteUser = async (
    req: FastifyRequest<UserParamsSchema>,
    reply: FastifyReply
  ) => {
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id);

    if (!user) throw AppError.NotFoundException("This user doest not exist");

    return reply.code(204).send({
      status: ApiStatus.SUCCESS,
    });
  };
}

export default UserController;
