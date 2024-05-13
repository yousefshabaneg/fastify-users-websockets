import { FastifyReply, FastifyRequest } from "fastify";

type CatchAsyncType = (
  req: FastifyRequest,
  reply: FastifyReply
) => Promise<any>;

const catchAsync = (fn: CatchAsyncType) => {
  return (req: FastifyRequest, reply: FastifyReply) => {
    fn(req, reply).catch((err: any) => {});
  };
};

export default catchAsync;
