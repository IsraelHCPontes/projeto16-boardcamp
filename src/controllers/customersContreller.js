import db from '../database/db.js';

export async function getCustomers(req, res){
    const cpf = req.query.cpf;
    try{
        if(cpf){
            const customers = await db.query(`
             SELECT *
             FROM  customers
             WHERE customers.cpf 
             LIKE $1`, [`%${cpf}%`]);
            res.send(customers.rows);
            return;
        }else{
            const customers = await db.query(`
            SELECT * 
            FROM customers`);
            console.log(customers.rows[0])
            res.send(customers.rows);
            return;
        } 
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
}

export async function getCustomersId(req, res){
    const { id } = req.params;
    try{
        const customers = await db.query(`
        SELECT *
        FROM  customers
        WHERE customers.id = $1`,
        [id]);
        res.send(customers.rows);
    }catch(error){
        console.log(error)
        res.sendStatus(404)
    }
}

export async function postCustomers(req, res){
    const {
    name,
    phone,
    cpf,
    birthday
} = req.body;

    try{
        await db.query(`
        INSERT INTO
        customers
        ( name,
          phone,
          cpf,
          birthday) 
        VALUES ($1,$2,$3,$4)`, [
            name,
            phone,
            cpf,
            birthday])
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