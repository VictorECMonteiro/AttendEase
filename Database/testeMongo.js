const mongoose = require("mongoose");

const discentePresente = require('./mongoData')

const querie = new discentePresente("root","victor","127.0.0.1", 30300);

querie.connectionDatabase();

//querie.checkAndProcessExit();

//querie.insertPresence();

//querie.userLoginCreate(40650, "Victor", "TESTE123");

const user = querie.userLoginCheck("Victor", "TESTE123")
//console.log(user)


//ESSE ARQUIVO É SO PRA TEsTAR SE TA FYUNCIONANDO