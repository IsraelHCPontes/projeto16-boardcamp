import { Router } from "express";
import { getRentals, postRentals } from "../controllers/rentalsContreller.js";
import rentalsValidation from "../middlewares/rentalsMidlleware .js";


const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", rentalsValidation, postRentals);

export default router;