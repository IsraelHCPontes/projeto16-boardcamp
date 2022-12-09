import { Router } from "express";
import {getCategories, postCategories} from '../controllers/categoriesContreller.js';
import categoriesValidation from "../middlewares/catergoriesMidlleware.js";

const router = Router();

router.get("/categories", getCategories);
router.post("/categories",categoriesValidation, postCategories);

export default router;