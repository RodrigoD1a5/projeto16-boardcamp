
import { db } from "../database/database.connection.js";
import { STATUS_CODE } from "../enums/statusCode.js";

export async function getCustomers(req, res) {

    const customers = await db.query('SELECT * FROM customers');

    try {

        res.status(STATUS_CODE.OK).send(customers.rows);

    } catch (error) {

        res.status(STATUS_CODE.SERVER_ERROR).send(error);

    }
}