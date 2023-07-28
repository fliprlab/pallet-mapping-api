import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import { locationDao } from "../../dao/locations-dao";
import { TLocation } from "../../models/type/location";
import { ItemDao } from "../../dao/item-dao";
import { TItem } from "../../models/type/item";
import { TLocationItems } from "../../models/type/location-items";

class IndexController {
  index = async (req: Request, res: Response) => {
    try {
      let data;

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

      // const duplicateItems = await ItemDao.getDuplicateItems();
      // await Promise.all(
      //   duplicateItems.map(async (items) => {
      //     const locationItems: any[] = items.items;
      //     for (let index = 0; index < locationItems.length; index++) {
      //       const element = locationItems[index];
      //       if (index != 0) {
      //         await ItemDao.deleteItemById(element._id);
      //       }
      //     }
      //   })
      // );
      // data = {
      //   duplicate: duplicateItems,
      // };

      return JsonResponse(res, {
        statusCode: 200,
        title: "index api called",
        status: "success",
        message: "api called successfully",
        data: data,
      });
    } catch (error: any) {
      logger.error(error.message);
    }
  };
}

export default new IndexController();
