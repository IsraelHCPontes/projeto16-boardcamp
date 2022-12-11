import rentalsSchema from "../schemas/rentalsSchema.js";
import db from '../database/db.js';
import dayjs from "dayjs";

export default async function  rentalsValidation(req, res, next){
    const rentals = req.body;
    const validation = rentalsSchema.validate(rentals, {abortEarly: false});
    const today = dayjs().format('YYYY-MM-DD');
   
    if(validation.error){
        const erros =  validation.error.details.map(detail => detail);
        res.status(400).send(erros);
        return;
    }

    try{
        const priceGameAlready = await db.query(`
         SELECT "pricePerDay","stockTotal"
         FROM games
         WHERE id = $1`,
         [rentals.gameId]);

        const customerAlready = await db.query(`
        SELECT *
        FROM customers
        WHERE id = $1`,
        [rentals.customerId]);

        const gameRentals = await db.query(`
        SELECT *
        FROM rentals
        WHERE id = $1`,
        [rentals.gameId])

        

        if(priceGameAlready.rows.length <= 0 
           || customerAlready.rows.length <= 0
           || rentals.daysRented === 0 
           || gameRentals.rows.length > priceGameAlready.stockTotal
           ){
            res.sendStatus(400);
            return;
        };
        res.locals.newBody ={
            customerId: rentals.customerId,
            gameId: rentals.gameId,
            rentDate: today,                 // data em que o aluguel foi feito
            daysRented: rentals.daysRented,  // por quantos dias o cliente agendou o aluguel
            returnDate: null,                // data que o cliente devolveu o jogo (null enquanto não devolvido)
            originalPrice: priceGameAlready.rows[0].pricePerDay * rentals.daysRented,             // preço total do aluguel em centavos (dias alugados vezes o preço por dia do jogo)
            delayFee: null                   // data que o cliente devolveu o jogo (null enquanto não devolvido)
        };
        console.log('to no mid', priceGameAlready.rows[0].pricePerDay );
        next();
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
}