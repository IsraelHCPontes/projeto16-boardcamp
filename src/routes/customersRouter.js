import { Router } from "express";
import { getCustomers, getCustomersId, postCustomers, putCustomers } from "../controllers/customersContreller.js";
import customersValidation from '../middlewares/customersMidlleware.js';

const router = Router();

router.get("/customers",  getCustomers);
router.get("/customers/:id",  getCustomersId);
router.post("/customers",customersValidation, postCustomers);
router.put("/customers/:id",  putCustomers);

export default router;