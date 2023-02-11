
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

export async function getCustomersById(req, res) {

    const { id } = req.params;

    const customer = await db.query('SELECT * FROM customers WHERE id = $1', [id]);

    try {

        if (customer.rows.length === 0) return res.sendStatus(STATUS_CODE.NOT_FOUND);

        res.status(STATUS_CODE.OK).send(customer.rows[0]);


    } catch (error) {

        res.status(STATUS_CODE.SERVER_ERROR).send(error);

    }

}