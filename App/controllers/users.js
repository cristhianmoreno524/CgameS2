module.exports = function (databaseConfig) {
    
  const express = require('express');
  const router = express.Router();
  
  const TABLE = 'users';
  
  const general = require('../utils2/general')();
  let model = general.getDatabaseModel();
  


  //{{SERVER}}/users/ 
  //Lista todos los usuarios
  router.get('/', function (request, response) {

    
      if (general.validateLogin(request))
        model.getAll(TABLE)
            .then((rows) => {
               response.send(rows);
            }).catch((error) => {
               console.error(error);
               response.send(error);
            });
      else response.send({ error: 'Se Necesita un Token' });
  });

  //{{SERVER}}/users/id 
  //Trae un usuario por ID
  router.get('/:id', function (request, response) {
      let id = request.params.id;
    if (general.validateLogin(request))
       model.getById(TABLE, id)
          .then((row) => {
              response.send(row);
          }).catch((error) => {
              console.error(error);
              response.send(error);
          });
   else response.send({ error: 'Se Necesita un TOKEN' });
  });

  //{{SERVER}}/users/
  //Crea un usuario
  router.post('/', function (request, response) {
    if (general.validateLogin(request))
      model.create(TABLE, request.body)
          .then((object) => {
              response.send(object)
          }).catch((error) => {
              console.error(error);
              response.send(error);
          });
    else response.send({ error: 'Se Necesita un TOKEN' });
  });

  //{{SERVER}}/users/:id
  //Edita un usuario
  router.put('/:id', function (request, response) {
      let id = request.params.id;
    if (general.validateLogin(request))
         model.update(TABLE, request.body, id)
          .then((row) => {
              response.send(row);
          }).catch((error) => {
              console.error(error);
              response.send(error);
          });
    else response.send({ error: 'Se Necesita un TOKEN' });    
  });


  //{{SERVER}}/users/id
  //Elimina un usuario
  router.delete('/:id', function (request, response) {
      let id = request.params.id;
      if (general.validateLogin(request))
         model.delete(TABLE, id)
          .then((message) => {
              response.send(message);
          }).catch((error) => {
              console.error(error);
              response.send(error);
          });
     else response.send({ error: 'Se Necesita un TOKEN' });
  });


  //{{SERVER}}/users/delete_users
  //Limpiar tabla
  router.get('/option/clean', function (request, response) {
    if (general.validateLogin(request))
      model.clean(TABLE)
          .then((message) => {
              response.send(message)
          }).catch((error) => {
              console.error(error);
              response.send(error);
          });
    else response.send({ error: 'Se Necesita un TOKEN' });
  });

  //{{SERVER}}/users/create_users
  router.post('/option/initialize', function (request, response) {
    if (general.validateLogin(request))
      model.initialize(TABLE, request.body)
          .then((message) => {
              response.send(message)
          }).catch((error) => {
              console.error(error);
              response.send(error);
          });
    else response.send({ error: 'Se Necesita un TOKEN' });
  });

  return router;
}
