import { ObjectId } from "mongodb";
import LocationModel from "../../models/LocationModel";
import LocationItemsModel from "../../models/LocationItemsModel";

interface Props {
  palletId: ObjectId;
}

export const resetZoneItems = async (props: Props) => {
  const { palletId } = props;

  return await LocationItemsModel.updateMany(
    {
      "pallet._id": palletId,
    },
    {
      $unset: {
        pallet: true,
        shipmentId: true,
      },
    }
  );
};
