const express = require('express');
const session = require('express-session');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan')
const cors = require('cors');
const passport = require('passport');


/*
*    RUTAS
*/

const user = require('./routes/userRoutes')
const service = require('./routes/servicesRoutes')

const port = process.env.PORT || 3000;


app.use(
    session({
        secret: "angeles-32",
        resave: false,
        saveUninitialized: false,
    })
)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended : true
}))

//app.use(cors());

app.use(cors({
    origin: '*', // O idealmente 'http://localhost:3001' para mayor seguridad
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by')

app.set('port', port);

/*
  LLAMADO A RUTAS  
*/

user(app);
service(app);


server.listen(3000, '192.168.0.7' || 'localhost', function(){
    console.log('Estamos en el puerto ', port);
});



//HADLER ERROR 
app.use((err, req, res, next) =>{
    console.log('Error: ', err);
    res.status(err.status || 500).json({
        success: false,
        message: 'Hubo un error en el servidor',
        error: err.message
    })
})

module.exports = {

    app: app,
    server: server

}