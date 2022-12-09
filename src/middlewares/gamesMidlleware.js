import gameSchema from "../schemas/gamesSchema.js";
import db from '../database/db.js';

export default async function  gamesValidation(req, res, next){
    const game = req.body;
    const validation = gameSchema.validate(game, {abortEarly: false});

    if(validation.error){
        const erros =  validation.error.details.map(detail => detail);
        res.status(400).send(erros);
        return;
    }

    try{
        const gameAlready = await db.query("SELECT * FROM games WHERE games.name = $1",[game.name]);
        console.log(gameAlready.rows)
        if(gameAlready.rows.length > 0){
            res.status(409).send({message:"Game já existe"})
            return;
        };
        next();
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
}