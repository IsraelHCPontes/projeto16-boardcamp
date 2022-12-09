import db from '../database/db.js';

export async function getGames(req, res){
    const name = req.query.name;
    try{
        if(name){
            const games = await db.query(`
             SELECT games.*, categories.name 
             AS "categoryName"
             FROM  games 
             JOIN categories
             ON games."categoryId" = categories.id
             WHERE games.name 
             LIKE $1`, [`%${name}%`]);

            res.send(games.rows);
            return;
        }else{
            const games = await db.query(`
            SELECT games.*, categories.name 
            AS "categoryName"
            FROM  games 
            JOIN categories
            ON games."categoryId" = categories.id`);
            res.send(games.rows);
            return;
        } 
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
}

export async function postGames(req, res){
    const {
    name,
    image,
    stockTotal,
    categoryId,
    pricePerDay} = req.body;

    try{
        await db.query(`INSERT INTO games (name,image,"stockTotal","categoryId","pricePerDay") 
        VALUES ($1,$2,$3,$4,$5)`, [name,image,stockTotal,categoryId,pricePerDay])
        res.sendStatus(201);
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
}