import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import { locationDao } from "../../dao/locations-dao";
import { TLocation } from "../../models/type/location";

class IndexController {
  index = async (req: Request, res: Response) => {
    try {
      // const findlocation = await locationDao.getAllLocations();
      // const duplicateLocations: TLocation[] = [];
      // const nonDuplicateLocations: TLocation[] = [];
      // findlocation.map((location) => {
      //   const find = nonDuplicateLocations.find(
      //     (l) => l.location.toUpperCase() === location.location.toUpperCase()
      //   );
      //   if (find) {
      //     duplicateLocations.push(location);
      //   } else {
      //     nonDuplicateLocations.push(location);
      //   }
      // });

      // const data = {
      //   locations: nonDuplicateLocations,
      //   duplicate: duplicateLocations,
      // };

      return JsonResponse(res, {
        statusCode: 200,
        title: "index api called",
        status: "success",
        message: "api called successfully",
        // data: data,
      });
    } catch (error: any) {
      logger.error(error.message);
    }
  };
}

export default new IndexController();
