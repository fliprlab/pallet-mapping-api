import { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import { palletDao } from "../../dao/pallet-dao";

export const getPallets = async (req: Request, res: Response) => {
  try {
    const { data, pageData } = await palletDao.getPalletsDao({
      paging: {
        itemPerPage: req.query.itemPerPage as string,
        page: req.query.page as string,
      },
      search: req.query.search as string,
      status: req.query.status as
        | "pallet-created"
        | "pallet-asign-grid"
        | "pallet-out",
    });
    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Data Find Successfully",
      message: "Data Find Successfully",
      data: data,
      pageData: pageData,
    });
  } catch (error) {
    return JsonResponse(res, {
      statusCode: 500,
      status: "error",
      title: "Error",
      message: "Something went wrong. Please try again.",
    });
  }
};
