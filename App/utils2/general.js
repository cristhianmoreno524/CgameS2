const jwt = require('jsonwebtoken');
const config = require('../../config.json');

const General = function(){

    General.defaultDatabase = config.database.default;

    if (typeof General.firebase == 'undefined'){
      const admin = require("firebase-admin");
      const port = process.env.FIRABASE_KEY ? process.env.PORT : require("../../private/key.json");
      //const serviceAccount = require("../../private/key.json");
      
        admin.initializeApp({
           credential: admin.credential.cert(serviceAccount),
           databaseURL: config.database.firebase.url
        });
      //const firestore = admin.firestore();
      General.firebase = admin;
    }


    
    if (typeof General.sqlite == 'undefined'){
      const sqlite3 = require('sqlite3').verbose();
      
    General.sqlite = new sqlite3.Database('./db/db.sqlite');
    }

    if (typeof General.mongoDB == 'undefined'){
      const mongodbCliente = require('mongodb').MongoClient;  
      const url = config.database.mongodb.url;

    General.mongoDB ={ client: mongodbCliente, url: url};
    }
   


     this.getFirebase = function(){
        return General.firebase;
     };


     this.getSQLite = function(){
      return General.sqlite;
     };


     this.getMongoDB = function(){
      return General.mongoDB;
     };





     this.getDatabaseModel = function(){
       let model;
      switch (General.defaultDatabase) {
        case "mongodb":
          model = require("../models/mongodb-model")(General.mongoDB.client, General.MongoDB.url);
          break;
        case "sqlite":
          model = require("../models/sqlite-model")(General.sqlite);
          break;
        case "firestore":
          model = require("../models/firestore-model")(General.firebase.firestore());
          break;
        default:
          model = require("../models/sqlite-model")(General.sqlite);
          break;
      }

      return model; 

     };

     this.setDefaultDatabase = function (database) {
       General.defaultDatabase = database;  

    };

    this.validateLogin = function (){
      let result = { auth: false, message: 'Initial Value'};
      
      let token = request.headers['auth-jwt'];

        if (token){
           jwt.verify(token, config.jwt.secret, function(error, decoded){
              if (error){
                result.auth = false;
                  if (typeof error == 'TokenExpiredError'){
                    result.message = '¡No Es El Token! Ya Expiró, En La Fecha: '+ error.expiredAt; 
                  }else{
                    result.message = '¡No Es El Token!'; 
                  }
              }else{
                result.auth = true;
                result.message = decoded
              }
           });

        }else {
          result.auth = false;
          result.message = '¡No Se Envió el Token!'
        }

      return result;

    };

    return this;
};
module.exports = General;