import { Router } from "express";
import { getRentals, postRentals, postRentalsReturn } from "../controllers/rentalsController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postRentalSchema } from "../schemas/postRentalsSchema.js";

const rentalsRouter = Router();

rentalsRouter.post('/rentals', validateSchema(postRentalSchema, 400), postRentals);
rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals/:id/return', postRentalsReturn);


export { rentalsRouter }; 