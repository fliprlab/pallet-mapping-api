import { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import dao from "../../dao";

export const scanLocation = async (req: Request, res: Response) => {
  try {
    const { scan, pallet: palletId } = req.body;

    const pallet = await dao.pallet.findByObjectId(palletId);

    if (!pallet) {
      return JsonResponse(res, {
        statusCode: 200,
        status: "error",
        title: "Pallet not found",
        message: "Invalid pallet id scanned",
      });
    }

    // check pallet distation
    if (pallet.destination.toUpperCase() !== scan.toUpperCase()) {
      return JsonResponse(res, {
        statusCode: 200,
        status: "error",
        title: "Invalid Destination",
        message: "The pallet has a different destination.",
      });
    }

    // if pallet is not picked up
    if (pallet.status !== "pallet-picked-up") {
      return JsonResponse(res, {
        statusCode: 200,
        status: "error",
        title: "Not Allowed",
        message:
          "This pallet has not been picked up, so it cannot be dispatched.",
      });
    }

    // get all items
    const shipmentItems = await dao.items.getShipmentItems({
      shipmentId: pallet.shipmentId,
    });

    let stringData = ``;
    shipmentItems.forEach((item) => {
      stringData += `${item.itemId}\n`;
    });

    // change status of pallet to "pallet-out"
    await dao.pallet.updatePalletStatus({
      palletId: pallet._id,
      status: "pallet-out",
    });

    // update status of location items
    await dao.items.updateStatus({
      shipmentId: pallet.shipmentId,
      status: "dispatched",
    });

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Success",
      message: "Pallet Scan Successfully",
      data: {
        qrCodeData: stringData,
        virtualId: "B" + pallet.palletId + "-" + `${shipmentItems.length}`,
        palletName: pallet.palletId,
      },
    });
  } catch (error: any) {
    return JsonResponse(res, {
      statusCode: 500,
      status: "error",
      title: "Error",
      message: error.message,
    });
  }
};
