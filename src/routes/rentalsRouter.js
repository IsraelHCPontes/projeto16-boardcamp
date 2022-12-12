import { Router } from "express";
import { getRentals, postRentals,postRentalsReturn, deleteRentals } from "../controllers/rentalsContreller.js";
import rentalsValidation from "../middlewares/rentalsMidlleware .js";


const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", rentalsValidation, postRentals);
router.post("/rentals/:id/return", postRentalsReturn)
router.delete("/rentals/:id", deleteRentals);
export default router;