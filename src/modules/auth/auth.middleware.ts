import { FastifyReply, FastifyRequest } from "fastify";
import AppError from "../../shared/helpers/AppError";
import UserModel from "../users/users.model";
import custom from "../../shared/types/custom";

class AuthMiddleware {
  static protect = async (req: FastifyRequest, reply: FastifyReply) => {
    // 1) Getting token and check if it's there...
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw AppError.NotAuthenticatedException(
        "Unauthorized, please log in to get access."
      );
    }

    // 2) Verification token...
    const { user } = await UserModel.verifyToken(token);

    if (!user) {
      throw new AppError("This user doest not longer exist", 401);
    }

    // GRANT ACCESS TO PROTECTED ROUTE...
    req.user = user;
  };

  static restrictTo = (...roles: string[]) => {
    return async (req: FastifyRequest, reply: FastifyReply) => {
      console.log(req.user);
      if (!req.user?.role || !roles.includes(req.user.role)) {
        throw AppError.NotAuthorizedException(
          "You do not have permission to perform this action"
        );
      }
    };
  };
}

export default AuthMiddleware;
