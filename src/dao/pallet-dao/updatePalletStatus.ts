import { ObjectId } from "mongodb";
import PalletModel from "../../models/PalletModel";
import { TPallet } from "../../models/type/pallet";

interface Props {
  palletId: ObjectId;
  status: TPallet["status"];
}

export const updatePalletStatus = async (props: Props) => {
  const { status, palletId } = props;
  return await PalletModel.findByIdAndUpdate(palletId, {
    $set: { status },
  }).exec();
};
