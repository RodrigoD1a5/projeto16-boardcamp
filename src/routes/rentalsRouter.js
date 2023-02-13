import { Router } from "express";
import { postRentals, postRentalsReturn } from "../controllers/rentalsController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postRentalSchema } from "../schemas/postRentalsSchema.js";

const rentalsRouter = Router();

rentalsRouter.post('/rentals', validateSchema(postRentalSchema, 400), postRentals);
rentalsRouter.post('/rentals/:id/return', postRentalsReturn);


export { rentalsRouter }; 