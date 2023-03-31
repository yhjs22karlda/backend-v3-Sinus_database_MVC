import {Router} from "express"
export const router = Router()

import {checkCartDelete, checkCartPost, checkCartOrder} from "../middleware/utils.js"
import {deleteCart, getCart, postCart, postOrder} from "../controllers/cartController.js"

router.get("/", getCart)

router.post("/", checkCartPost, postCart)

router.delete("/", checkCartDelete, deleteCart)

router.post("/order", checkCartOrder, postOrder)