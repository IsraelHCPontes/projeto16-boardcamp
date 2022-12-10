import customersSchema from "../schemas/customersSchema.js";
import db from '../database/db.js';

export default async function customersValidation(req, res, next){
    const customers = req.body;
    const validation = customersSchema.validate(customers, {abortEarly: false});

    if(validation.error){
        const erros =  validation.error.details.map(detail => detail);
        res.status(400).send(erros);
        return;
    }

    try{
        const customersAlready = await db.query("SELECT * FROM customers WHERE customers.cpf = $1",[customers.cpf]);
        console.log(customersAlready.rows)
        if(customersAlready.rows.length > 0){
            res.status(409).send({message:"Usuario já existe"})
            return;
        };
        next();
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
}