const db = require('../config/config');

const Service = {}

Service.registerService = async (service) => {

    const sql = `
        INSERT INTO
            services(
                name,
                description,
                price, 
                quantity,
                image,
                created_at,
                updated_at
            )
        values ($1,$2,$3,$4,$5,$6,$7) RETURNING id

    `
    return db.oneOrNone(sql, [
        service.name,
        service.description,
        service.price,
        service.quantity,
        service.image,
        new Date(),
        new Date(),
    ])       
}

Service.update = (service) =>{
    const sql = `
        UPDATE
            services
        SET 
            name = $2,
            description = $3,
            price = $4,
            quantity = $5,
            image = $6,
            updated_at = $7
        WHERE
            id = $1
    `;
    return db.none(sql, [
        service.id,
        service.name,
        service.description,
        service.price,
        service.quantity,
        service.image,
        new Date()
    ])
}


Service.getAll = () => {
    const sql = `
        select * from services;
    `;
    return db.manyOrNone(sql);
}


module.exports = Service;