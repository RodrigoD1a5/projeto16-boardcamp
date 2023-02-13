import dayjs from "dayjs";
import { STATUS_CODE } from "../enums/statusCode.js";

export async function postRentals(req, res) {
    const { customerId, gameId, daysRented } = req.body;

    const rental = {
        customerId,
        gameId,
        daysRented,
        rentDate: dayjs().format("YYYY-MM-DD"),
        originalPrice: daysRented * 3,
        returnDate: null,
        delayFee: null
    };

    try {

        res.send(rental);

    } catch (error) {

        res.status(STATUS_CODE.SERVER_ERROR).send(error);

    }
}