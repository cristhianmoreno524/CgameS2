module.exports = function(){
    const express = require('express');
    const router = express.Router();

    router.get('/hola', function(request, response){
        console.log('Ingreso a ¡¡hola!!');
        response.send('Hola Amigo!!!');
    });
    
    router.get('/usuarios', function(request, response){
        
        /*let usuarios = []
        usuario1 = {};
        usuario1.nombre = "Sergio";
        usuario1.apellido = "Alvarez";
        usuario1.telefono = "12345678";
        usuario1.edad = 35;
        usuario1.game = "Halo 5 Guardians"
    
        usuarios.push(usuario1);*/
        response.send([{"nombre":"Sergio", "apellido":"Perez", edad: 28, "telefono":"3456781", "game":"GTA V"},{"nombre":"Napoleon", "apellido":"Bonaparte", "edad": 30, "telefono":3456712, "game":"Halo 5 Guardians"}, {"nombre":"George", "apellido":"Washington", "edad": 26, "telefono":"4567823", "game":"Need For Speed Heat 2020"}, {"nombre":"Melania", "apellido":"Trump", "edad":"40", "telefono":"3456734", "game":"Resident Evil 5"}, {"nombre":"john", "apellido":"Adams", "edad": 40, "telefono":"3456712", "game":"Need For Speed Payback"}, {"nombre":"james", "apellido":"Madison", "edad":"30", "telefono":"6781280", "game":"Need For Speed Most Wantend"}, {"nombre":"james", "apellido":"Monroe", "edad": 30, "telefono":"9874321", "game":"Age of Empires IV" }]);
    
    
    });
    
    router.get('/games', function(request, response){
        response.send([{"nombre":"Halo Wars"}, {"nombre":"Halo Reach"}, {"nombre":"Halo Combat Evolved"}, {"nombre":"Halo 2"}, {"nombre":"Halo 3 ODST"}, {"nombre":"Halo Spartan Strike"}, {"nombre":"Halo 3"}, {"nombre":"Halo Spartan Assault"}, {"nombre":"Halo 4"}, {"nombre":"Halo 5"}, {"nombre":"Halo Wars 2"}])
    });
    
};