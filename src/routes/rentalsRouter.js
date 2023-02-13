import { Router } from "express";
import { postRentals } from "../controllers/rentalsController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postRentalSchema } from "../schemas/postRentalsSchema.js";

const rentalsRouter = Router();

rentalsRouter.post('/rentals', validateSchema(postRentalSchema, 400), postRentals);


export { rentalsRouter }; 