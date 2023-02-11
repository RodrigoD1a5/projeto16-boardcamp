import { Router } from "express";
import { getGames, postGames } from "../controllers/gamesController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postGameSchema } from "../schemas/postGameSchema.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", validateSchema(postGameSchema, 404), postGames);

export { gamesRouter };