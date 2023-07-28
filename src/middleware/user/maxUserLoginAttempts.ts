import { NextFunction, Request, Response } from "express";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { JsonResponse } from "../../utils/jsonResponse";

const opts = {
  points: 10, // 10 points
  duration: 3 * 60, // Per minute
};

const rateLimiter = new RateLimiterMemory(opts);

export const maxUserLoginAttempts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  rateLimiter
    .consume(req.socket.remoteAddress as string, 1)
    .then((apiResponse) => {
      next();
    })
    .catch((apiResponseErr) => {
      return JsonResponse(res, {
        statusCode: 429,
        title: "max login attempts",
        status: "error",
        message: "Your access is temporary blocked. Try after some time",
      });
    });
};
