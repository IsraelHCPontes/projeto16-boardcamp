import db from '../database/db.js';

export async function getCategories(req, res){
    try{
        const categories = await db.query("SELECT * FROM categories");
        res.send(categories.rows);
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
}

export async function postCategories(req, res){
    const {name} = req.body;
    try{
        await db.query("INSERT INTO categories (name) VALUES ($1)", [name])
        
        res.sendStatus(201);
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
}