const db = require('../config/config');
const bcrypt = require('bcryptjs')

const User = {}

User.register = async (user) => {

    const hash = await bcrypt.hash(user.password, 10)

    const sql = `
        INSERT INTO
            users(
                name,
                lastname,
                email, 
                dni,
                password,
                created_at,
                updated_at,
                session_token
            )
        values ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id

    `
    return db.oneOrNone(sql, [
        user.name,
        user.lastname,
        user.email,
        user.dni,
        hash,
        new Date(),
        new Date(),
        user.session_token
    ])       
}

User.findByEmail = (email) => {
    const sql = `
        SELECT 
            id,
            name, 
            lastname,
            email,
            dni,
            password,
            session_token
        FROM 
            users
        WHERE 
            email = $1
        `;

    return db.oneOrNone(sql, email)
}

User.findById = (id, callback) => {
    const sql = `
        SELECT
	        name, 
	        lastname,
	        email,
	        dni,
	        password,
	        session_token
        FROM
        	users
        WHERE 
	        id = $1`;
    return db.oneOrNone(sql, id).then(user => {callback(null, user)})
}

User.update = (user) =>{
    const sql = `
        UPDATE
            users
        SET 
            name = $2,
            lastname = $3,
            email = $4,
            dni = $5,
            password = $6,
            updated_at = $7
        WHERE
            id = $1
    `;
    return db.none(sql, [
        user.id,
        user.name,
        user.lastname,
        user.email,
        user.dni,
        user.phone,
        user.image,
        user.password,
        new Date()
    ])
}

User.updateSessionToken = (id_user, session_token) => {
  const sql = `
  UPDATE
	    users
  SET 
      session_token = $2
  WHERE
	    id = $1
  `;
  return db.none(sql, [id_user, session_token]);
};



module.exports = User;