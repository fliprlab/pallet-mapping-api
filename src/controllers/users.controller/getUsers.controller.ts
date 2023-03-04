import { Request, Response } from "express";
import { getUsersAggregation } from "../../aggregation/user/users.aggregation";
import { logger } from "../../config/logger";
import { usersDao } from "../../dao/users-dao";
import { paginated } from "../../middleware/paginate/paginated.middleware";
import UsersModel from "../../models/UsersModel";
import { JsonResponse } from "../../utils/jsonResponse";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { data, pageData } = await paginated({
      Model: UsersModel,
      aggregationArray: getUsersAggregation({ req, res }),
      req,
    });

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Success",
      message: "Find users successfully.",
      data: data,
      pageData: pageData,
    });
  } catch (error) {
    logger.error(error);
    return JsonResponse(res, {
      statusCode: 500,
      status: "error",
      title: "Error",
      message: "Something went wrong. Please try again.",
    });
  }
};
