import { db } from "../database/database.connection.js";
import { STATUS_CODE } from "../enums/statusCode.js";

export async function getGames(req, res) {

    const games = await db.query('SELECT * FROM games');

    try {

        res.status(STATUS_CODE.OK).send(games.rows);

    } catch (error) {

        res.status(STATUS_CODE.SERVER_ERROR).send(error);

    }

}

export async function postGames(req, res) {
    const { name, image, stockTotal, pricePerDay } = req.body;

    try {
        const nameAlreadyExists = await db.query('SELECT * FROM games WHERE name = $1', [name]);

        if (nameAlreadyExists.rows.length != 0) return res.sendStatus(STATUS_CODE.CONFLICT);


        await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") values ($1, $2, $3, $4)`,
            [name, image, stockTotal, pricePerDay]);

        return res.sendStatus(STATUS_CODE.CREATED);

    } catch (error) {

        res.status(STATUS_CODE.SERVER_ERROR).send(error);

    }
}