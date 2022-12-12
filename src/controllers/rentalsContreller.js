import db from '../database/db.js';
import dayjs from 'dayjs';

export async function getRentals(req, res){
    const customerId = req.query.customerId;
    const gameId = req.query.gameId;
    let rentalsRes;

    
    try{
        if(customerId && !gameId){
            const rentals = await db.query(`
             SELECT rentals.*, customers.name AS "customersName" , games.name AS "gameName", games."categoryId" AS "gamecategoryId", categories.name AS "categoryName"
             FROM rentals
             JOIN customers
             ON rentals."customerId" = customers.id
             JOIN games 
             ON rentals."gameId" =  games.id
             JOIN categories 
             ON games."categoryId" =  categories.id
             WHERE rentals."customerId" = $1`, 
             [customerId]);

             rentalsRes = rentals.rows.map(rental =>{

                let rentalsFormated = dayjs(rental.rentDate).format('YYYY-MM-DD')

                 return{
                    id: rental.id ,
                    customerId: rental.customerId,
                    gameId: rental.gameId,
                    rentDate: rentalsFormated,
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
        }  


            if(!customerId &&  gameId){
                const rentals = await db.query(`
                 SELECT rentals.*, customers.name AS "customersName" , games.name AS "gameName", games."categoryId" AS "gamecategoryId", categories.name AS "categoryName"
                 FROM rentals
                 JOIN customers
                 ON rentals."customerId" = customers.id
                 JOIN games 
                 ON rentals."gameId" =  games.id
                 JOIN categories 
                 ON games."categoryId" =  categories.id
                 WHERE rentals."gameId" = $1`,  
                 [gameId]);
    
                 rentalsRes = rentals.rows.map(rental =>{
    
                    let rentalsFormated = dayjs(rental.rentDate).format('YYYY-MM-DD')
    
                     return{
                        id: rental.id ,
                        customerId: rental.customerId,
                        gameId: rental.gameId,
                        rentDate: rentalsFormated,
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
            } 

                if(customerId &&  gameId){
                    const rentals = await db.query(`
                     SELECT rentals.*, customers.name AS "customersName" , games.name AS "gameName", games."categoryId" AS "gamecategoryId", categories.name AS "categoryName"
                     FROM rentals
                     JOIN customers
                     ON rentals."customerId" = customers.id
                     JOIN games 
                     ON rentals."gameId" =  games.id
                     JOIN categories 
                     ON games."categoryId" =  categories.id
                     WHERE rentals."gameId" = $1
                     AND rentals."costumerId" = $2`, 
                     [gameId, customerId]);
        
                     rentalsRes = rentals.rows.map(rental =>{
        
                        let rentalsFormated = dayjs(rental.rentDate).format('YYYY-MM-DD')
        
                         return{
                            id: rental.id ,
                            customerId: rental.customerId,
                            gameId: rental.gameId,
                            rentDate: rentalsFormated,
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
        }

        console.log(gameId, customerId)
        if(!customerId && !gameId){
            const rentals = await db.query(`
             SELECT rentals.*, customers.name AS "customersName" , games.name AS "gameName", games."categoryId" AS "gamecategoryId", categories.name AS "categoryName"
             FROM rentals
             JOIN customers
             ON rentals."customerId" = customers.id
             JOIN games 
             ON rentals."gameId" =  games.id
             JOIN categories 
             ON games."categoryId" =  categories.id`)

              rentalsRes = rentals.rows.map(rental =>{

                let rentalsFormated = dayjs(rental.rentDate).format('YYYY-MM-DD')
                let returnDateFormated = dayjs(rental.returnDate).format('YYYY-MM-DD')

                 return{
                    id: rental.id ,
                    customerId: rental.customerId,
                    gameId: rental.gameId,
                    rentDate: rentalsFormated,
                    daysRented: rental.daysRented,
                    returnDate: rental.returnDate === null? null : returnDateFormated,
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
        }
        res.send(rentalsRes);
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

export async function postRentalsReturn(req, res){
    const id = req.params.id;
    const today = dayjs().format('YYYY-MM-DD')
    let delayFree = null

    try{
        const rental = await db.query(`
        SELECT *
        FROM rentals
        WHERE id = $1`,
        [id])

        if(!rental){
            res.sendStatus(404)
            return;
        }

        if(rental.rows[0].returnDate !== null){
            res.sendStatus(400)
            return;
        }

        let rentDateFormated = dayjs(rental.rows[0].rentDate).format('YYYY-MM-DD')
        let lastDay = dayjs().diff(rentDateFormated, 'day')
        if(lastDay > rental.daysRented){
           delayFree = rental.originalPrice * lastDay
        }
        await db.query(`
        UPDATE rentals
        SET "returnDate"=$1, "delayFee"=$2
        WHERE id=$3
        `, [today,delayFree,id])
        res.sendStatus(201)    
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
}

export async function deleteRentals(req, res){
    const id = req.params.id;

    try{
        const rental = await db.query(`
        SELECT *
        FROM rentals
        WHERE id = $1`,
        [id])


        if(!rental){
            res.sendStatus(404)
            return;
        }

        if(rental.rows[0].returnDate !== null){
            res.sendStatus(400)
            return;
        }

        await db.query(`DELETE FROM rentals WHERE id=$1`, [id])

        res.sendStatus(200);
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
}

