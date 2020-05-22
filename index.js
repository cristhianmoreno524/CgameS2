const express = require('express');
const app = express();
const config = require('./config.json');
//const config = require('./App/controllers/config'); <===Solo si se requiere con config.js, si no, utilizar config.json
const port = process.env.PORT ? process.env.PORT : config.app.port ? config.app.port : 3000;
const bind = process.env.BIND ? process.env.BIND : config.app.bind ? config.app.bind : '127.0.0.1';
//const port = process.env.PORT || 3456 || config.app.port || 3000;     <===Menos Utilizado Operador Ternario

//URL Encode Support for POST, PUT Methods
const bodyParser = require('body-parser');
 
//let userController = require('./app/controllers/users')();
let usersController = require('./app/controllers/users_firebase')();
let classesController = require ('./app/controllers/classes')();
let loginController = require ('./app/controllers/login')();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//{{SERVER}}/users/
app.use('/users', usersController);
app.use('/classes', classesController);
app.use('/login', loginController); 



app.listen(port,bind, function(){
    console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++');
    console.log('App: '+ config.app.name);
    console.log('Corriendo... : '+ config.app.bind+':'+config.app.port);
    console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++');
});