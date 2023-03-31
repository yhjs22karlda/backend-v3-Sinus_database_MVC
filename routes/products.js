import {Router} from "express"
export const router = Router()

import { getProducts } from "../controllers/productsController.js"

router.get("/", getProducts)