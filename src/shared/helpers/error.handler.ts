import AppError from "./AppError";
import ApiStatus from "../types/apiStatus.enum";
import config from "../config/config";
import { FastifyReply, FastifyRequest } from "fastify";

const handleCastErrorDB = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: any) => {
  const message = `Duplicate field value: "${err.keyValue.name}" Please use another value.`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid Input data: ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again", 401);

const throwErrorDev = (
  error: any,
  req: FastifyRequest,
  reply: FastifyReply
) => {
  return reply.code(error.statusCode).send({
    status: error.status,
    error: error,
    message: error.message,
    stack: error.stack,
  });
};

const throwErrorProd = (err: any, req: FastifyRequest, reply: FastifyReply) => {
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    return reply.code(err.statusCode).send({
      status: err.status,
      message: err.message,
    });
  }
  // B) Programming or other unknown error: don't leak error details
  return reply.code(500).send({
    status: ApiStatus.ERROR,
    message: "Something went very wrong!",
  });
};

const ErrorHandler = (err: any, req: FastifyRequest, reply: FastifyReply) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || ApiStatus.ERROR;

  if (config.nodeEnv === "development") {
    throwErrorDev(err, req, reply);
  } else if (config.nodeEnv === "production") {
    let error = { ...err };
    error.message = err.message;

    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === "CastError") error = handleCastErrorDB(error);
    if (err.name === "ValidationError") error = handleValidationErrorDB(error);
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

    throwErrorProd(error, req, reply);
  }
};

export default ErrorHandler;
