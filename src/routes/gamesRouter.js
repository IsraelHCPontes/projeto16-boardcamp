import { Router } from "express";
import { getGames, postGames } from "../controllers/gamesContreller.js";
import gamesValidation from "../middlewares/gamesMidlleware.js";

const router = Router();

router.get("/games", getGames);
router.post("/games",gamesValidation, postGames);

export default router;