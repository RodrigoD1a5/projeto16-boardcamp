import { Router } from "express";
import { deleteRentals, getRentals, postRentals, postRentalsReturn } from "../controllers/rentalsController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postRentalSchema } from "../schemas/postRentalsSchema.js";

const rentalsRouter = Router();

rentalsRouter.post('/rentals', validateSchema(postRentalSchema, 400), postRentals);
rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals/:id/return', postRentalsReturn);
rentalsRouter.delete('/rentals/:id', deleteRentals);


export { rentalsRouter }; 