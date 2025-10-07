const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const { log } = require('util');


module.exports = {

    async create(req, res, next){
        try {
            
            const user = req.body; 
            const data = await User.register(user);

            const token = jwt.sign({ id: data.id, email: user.email }, keys.secretOrKey, {
                    
                })

                const mydata = {
                    id: data.id,
                    name: user.name,
                    lastname: user.lastname,
                    email: user.email,
                    dni: user.dni,
                    session_token: `JWT ${token}`
                };

            return res.status(201).json({
                success: true,
                message: `Se realizo correctamente el registro`,
                data: mydata
            })

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false, 
                message: `Error con el registro`,
                error: error
            })
        }
    },


    async login(req, res, next){
        try {

            const email = req.body.email;
            const password = req.body.password;

            const myUser = await User.findByEmail(email);

            if(!myUser){
                return res.status(401).json({
                    success: false,
                    message: 'El email no fue encontrado'
                })
            }

            const isPasswordValid = await bcrypt.compare(password, myUser.password); 

            if(isPasswordValid){
                const token = jwt.sign({ id: myUser.id, email: myUser.email }, keys.secretOrKey, {
                    
                })

                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    phone: myUser.phone,
                    image: myUser.image,
                    email: myUser.email,
                    dni: myUser.dni,
                    password: myUser.password,
                    residentialID: myUser.residential,
                    session_token: `JWT ${token}`,
                    conjunto: myUser.conjunto,
                    roles: myUser.roles
                };

                 await User.updateSessionToken(myUser.id, `JWT ${token}`);
                console.log(data);

                return res.status(201).json({
                    success: true, 
                    message: 'El usuario ha sido autenticado',
                    data: data
                })
            }
            else{
                 return res.status(401).json({
                    success: false, 
                    message: 'La contraseña es incorrecta',
                })
            }

            
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false, 
                message: `Hubo un error con el login del usuario`,
                error: error
            })
        }
    },

    async update(req, res, next) {
    try {
      console.log('Usuario', req.body.user);

      const user = JSON.parse(req.body.user);
      console.log('Usuario parseado', user);

      await User.update(user); //GUARDANDO LA URL EN LA BASE DE DATOS

      return res.status(201).json({
        success: true,
        message: 'Los datos del usuario se han actualizado correctamente',
        data: user,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: 'Error al actualizar los datos',
        error: error,
      });
    }
  }

}