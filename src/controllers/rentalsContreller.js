import db from '../database/db.js';

export async function getRentals(req, res){
    const customerId = req.query.customerId;
    const gameId = req.query.gameId;

    try{
        if(customerId || gameId){
            const rentals = await db.query(`
             SELECT rentals.*, customers.name AS "customersName" , games.name AS "gameName", games."categoryId" AS "gamecategoryId", categories.name AS "categoryName"
             FROM rentals
             JOIN customers
             ON rentals."customerId" = customers.id
             JOIN games 
             ON rentals."gameId" =  games.id
             JOIN categories 
             ON games."categoryId" =  categories.id
             WHERE rentals."customerId" = $1
             OR rentals."gameId" = $2`,  
             [customerId, gameId]);

            const rentalsRes = rentals.rows.map(rental =>{
                 return{
                    id: rental.id ,
                    customerId: rental.customerId,
                    gameId: rental.gameId,
                    rentDate: rental.rentDate,
                    daysRented: rental.daysRented,
                    returnDate: rental.returnDate, 
                    originalPrice: rental.originalPrice,
                    delayFee: rental.delayFee,
                    customer: {
                     id: rental.customerId,
                     name: rental.customersName
                    },
                    game: {
                      id: rental.gameId,
                      name: rental.gameName,
                      categoryId: rental.gamecategoryId,
                      categoryName: rental.categoryName
                    }
                  }
            })     

            res.send(rentalsRes);
            return;
        }else{
            const rentals = await db.query(`
            SELECT * 
            FROM rentals`);
            res.send(rentals.rows);
            return;
        } 
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
}


export async function postRentals(req, res){
    const{
        customerId,
        gameId,
        rentDate,   
        daysRented,           
        returnDate,       
        originalPrice,
        delayFee
    }= res.locals.newBody;
  console.log('to no post',  customerId,
  gameId,
  rentDate,   
  daysRented,           
  returnDate,       
  originalPrice,
  delayFee )
    try{
        await db.query(`
        INSERT INTO rentals
            (
            "customerId",
            "gameId",
            "rentDate",   
            "daysRented",           
            "returnDate",       
            "originalPrice",
            "delayFee"
            )
                  
        VALUES ($1,$2,$3,$4,$5,$6,$7)`, 
        [
            customerId,
            gameId,
            rentDate,   
            daysRented,           
            returnDate,       
            originalPrice,
            delayFee
        ])
        res.sendStatus(201);
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
}

export async function putCustomers(req, res){
    const id = req.params.id;
    const {
        name,
        phone,
        cpf,
        birthday
    } = req.body;

    try{
        await db.query(`
        UPDATE customers
        SET  name=$1, phone=$2, cpf=$3, birthday=$4
        WHERE id=$5 
        `, [name,
            phone,
            cpf,
            birthday,
            id])
        res.sendStatus(201)    
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
}