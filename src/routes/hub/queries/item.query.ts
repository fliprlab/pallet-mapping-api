import { Router } from "express";
import { itemController } from "../../../controllers/item-controller";

export const itemQuery = (router:Router)=>{
    router.get("/get-items",itemController.getAllItems)
}