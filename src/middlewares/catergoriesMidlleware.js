import categorieSchema from "../schemas/categoriesSchema.js";
import db from '../database/db.js';

export default async function  categoriesValidation(req, res, next){
    const categorie = req.body;
    const validation = categorieSchema.validate(categorie, {abortEarly: true});

    if(validation.error){
        const erros =  validation.error.details.map(detail => detail);
        res.status(400).send(erros);
        return;
    }

    try{
        const categorieAlready = await db.query("SELECT * FROM categories WHERE categories.name = $1",[categorie.name]);
        console.log(categorieAlready.rows)
        if(categorieAlready.rows.length > 0){
            res.status(409).send({message:"Categoria já existe"})
            return;
        };
        next();
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
}