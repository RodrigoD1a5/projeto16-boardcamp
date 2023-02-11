import { Router } from "express";
import { getCustomers, getCustomersById, postCustomer, putCustomer } from "../controllers/customersController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postCustomerSchema } from "../schemas/postCustomerSchema.js";

const customersRouter = Router();

customersRouter.get('/customers', getCustomers);
customersRouter.get('/customers/:id', getCustomersById);
customersRouter.post('/customers', validateSchema(postCustomerSchema, 400), postCustomer);
customersRouter.put('/customers/:id', validateSchema(postCustomerSchema, 400), putCustomer);

export { customersRouter };