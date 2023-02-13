import dayjs from "dayjs";
import { db } from "../database/database.connection.js";
import { STATUS_CODE } from "../enums/statusCode.js";

export async function postRentals(req, res) {
    const { customerId, gameId, daysRented } = req.body;

    try {

        const game = await db.query('SELECT * FROM games WHERE id = $1', [gameId]);
        if (game.rows.length === 0) return res.sendStatus(STATUS_CODE.BAD_REQUEST);
        const pricePerDay = game.rows[0].pricePerDay;


        const rental = {
            customerId,
            gameId,
            daysRented,
            rentDate: dayjs().format("YYYY-MM-DD"),
            originalPrice: daysRented * pricePerDay,
            returnDate: null,
            delayFee: null
        };


        res.send(rental);

    } catch (error) {

        res.status(STATUS_CODE.SERVER_ERROR).send(error);

    }
}