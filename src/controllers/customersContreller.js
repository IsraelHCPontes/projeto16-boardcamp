import db from '../database/db.js';
import dayjs from 'dayjs';

export async function getCustomers(req, res){
    const cpf = req.query.cpf;
    try{
        if(cpf){
            const customers = await db.query(`
             SELECT *
             FROM  customers
             WHERE cpf 
             LIKE $1`, [`%${cpf}%`]);
             const cutomersPackage = customers.rows.map(customer =>{
                customer.birthday = dayjs(customer.birthday).format('YYYY-MM-DD')
            })
            res.send(cutomersPackage);
            return;
        }else{
            const customers = await db.query(`
            SELECT * 
            FROM customers`);
            const cutomersPackage = customers.rows.map(({ 
                id,
                name,
                phone,
                cpf,
                birthday}) =>{
                const birthdayFormated = dayjs(birthday).format('YYYY-MM-DD')
                 return(
                    {
                        id,
                        name,
                        phone,
                        cpf,
                        birthday: birthdayFormated
                    }
                 )   
            })

            
            
            res.send(cutomersPackage);
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

        const cutomersPackage = customers.rows.map(({ 
            id,
            name,
            phone,
            cpf,
            birthday}) => {
            console.log()    
            const birthdayFormated = dayjs(birthday).format('YYYY-MM-DD')
             return(
                {
                    id,
                    name,
                    phone,
                    cpf,
                    birthday: birthdayFormated
                }
             )
           
        })
       
        res.send(cutomersPackage[0]);
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