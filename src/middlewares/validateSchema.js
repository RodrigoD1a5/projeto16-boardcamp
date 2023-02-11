import { STATUS_CODE } from "../enums/statusCode.js";

export function validateSchema(schema, statusCode) {
    return (req, res, next) => {

        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errorMessages = error.details.map(error => error.message);
            return res.status(statusCode).send(errorMessages);
        }
        next();
    };
}