const UserController = require('../controllers/userController');
const passport = require('passport')

module.exports = (app, upload) => {

    app.post('/api/user/create', UserController.create);

    app.post('/api/user/login', UserController.login);
}

//Sirve para seguridad de los usuarios con su respectivo token
//passport.authenticate('jwt', {session: false})
