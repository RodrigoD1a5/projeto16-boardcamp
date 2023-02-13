import dayjs from "dayjs";
import { db } from "../database/database.connection.js";
import { STATUS_CODE } from "../enums/statusCode.js";

export async function postRentals(req, res) {
    const { customerId, gameId, daysRented } = req.body;

    try {

        const customer = await db.query('SELECT * FROM customers WHERE id = $1', [customerId]);
        if (customer.rows.length === 0) return res.sendStatus(STATUS_CODE.BAD_REQUEST);

        const game = await db.query('SELECT * FROM games WHERE id = $1', [gameId]);
        if (game.rows.length === 0) return res.sendStatus(STATUS_CODE.BAD_REQUEST);
        const pricePerDay = game.rows[0].pricePerDay;

        const rentals = await db.query('SELECT * FROM rentals WHERE "gameId"= $1', [gameId]);

        const gameIsAvailable = rentals.rowCount >= game.rows[0].stockTotal;
        if (gameIsAvailable) return res.sendStatus(STATUS_CODE.BAD_REQUEST);

        const rental = {
            customerId,
            gameId,
            daysRented,
            rentDate: dayjs().format("YYYY-MM-DD"),
            originalPrice: daysRented * pricePerDay,
        };

        await db
            .query('INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") values ($1, $2, $3, $4, $5, $6, $7)',
                [
                    rental.customerId,
                    rental.gameId,
                    rental.rentDate,
                    rental.daysRented,
                    null,
                    rental.originalPrice,
                    null
                ]);

        res.sendStatus(STATUS_CODE.CREATED);

    } catch (error) {

        res.status(STATUS_CODE.SERVER_ERROR).send(error);

    }
}

export async function getRentals(req, res) {

    try {
        const rentOutOfShape = await db.query(`
          SELECT 
            rentals.*,
            customers.id AS "idCustomer",
            customers.name AS "nameCustomer",
            games.id AS "idGame",
            games.name AS "idName"
          FROM rentals
          INNER JOIN customers ON rentals."customerId" = customers.id
          INNER JOIN games ON rentals."gameId" = games.id
        `);

        const rentals = rentOutOfShape.rows.map((r) => {
            return {
                id: r.id,
                customerId: r.customerId,
                gameId: r.gameId,
                rentDate: r.rentDate,
                daysRented: r.daysRented,
                returnDate: r.returnDate,
                originalPrice: r.originalPrice,
                delayFee: r.delayFee,
                customer: {
                    id: r.idCustomer,
                    name: r.nameCustomer,
                },
                game: {
                    id: r.idGame,
                    name: r.idName,
                },
            };
        });

        res.status(STATUS_CODE.OK).send(rentals);

    } catch (error) {
        console.error(error);
        return res.status(STATUS_CODE.SERVER_ERROR).send(error);
    }
}

export async function postRentalsReturn(req, res) {
    const { id } = req.params;

    try {
        let delayFee = 0;

        const rental = await db.query('SELECT * FROM rentals WHERE id = $1', [id]);
        if (rental.rows.length === 0) return res.sendStatus(STATUS_CODE.NOT_FOUND);
        if (rental.rows[0].returnDate) return res.sendStatus(STATUS_CODE.BAD_REQUEST);

        const game = await db.query('SELECT * FROM games WHERE id=$1', [rental.rows[0].gameId]);

        const checkDate = Math.trunc((new Date().getTime() - new Date(rental.rows[0].rentDate).getTime()) / (3600 * 24 * 1000));

        if (checkDate > rental.rows[0].daysRented) {
            delayFee = (checkDate - rental.rows[0].daysRented) * game.rows[0].pricePerDay;
        }
        console.log(new Date());

        await db.query('UPDATE rentals SET "returnDate"= $1, "delayFee"=$2 WHERE id = $3', [new Date(), delayFee, id]);

        res.sendStatus(STATUS_CODE.OK);

    } catch (error) {

        res.status(STATUS_CODE.SERVER_ERROR).send(error);

    }
}