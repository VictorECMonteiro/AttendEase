//Importando Modulos
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const {Schema} = mongoose
//Fim
//Schemas e Models
const userData = new Schema({
    matricula: Number,
    nome: String,
    classe: String,
    serie: Number,
    email: String,
    dataNascimento: Date,
});

const userDataPresence = new Schema({
    matricula: Number,
    nome: String,
    classe: String,
    serie: Number,
    entrada: Date,
    saida: Date

});
const userLogin = new Schema({
    matricula: Number,
    nome: String,
    password: String
});
const schoolClass = new Schema({
    classe: String,
    serie: Number,
});
const dataUser = mongoose.model("dataUser", userData)

const userCreate = mongoose.model("userCreate", userLogin);
const userDataPresente = mongoose.model("userData", userDataPresence);
//Fim Schemas e Models

//Data Method
const date = new Date();
date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
console.log(date);
//Fim Data Method


class discentePresente {
    userName;
    passwordDatabase;
    databaseIP;
    databasePort;
    constructor(userName, passwordDatabase,databaseIP, databasePort){
        this.userName = userName;
        this.passwordDatabase = passwordDatabase;
        this.databaseIP = databaseIP;
        this.databasePort = databasePort;
    }

    connectionDatabase(){

        console.log(this.userName)

        mongoose.connect("mongodb://"+this.userName+":"+this.passwordDatabase+"@"+this.databaseIP+":"+this.databasePort, {dbName:"discentePresente"}).then(()=>{
            console.log("OK");
        }).catch((err)=>{
            console.log(err)
            return
        })
    }

    async checkAndProcessExit(matricula, nome, classe, serie){
        
        const checkEntrada = await userDataPresente.findOne({
            nome: nome,
            entrada:date.getDate});

        if (checkEntrada.saida == null){
            await userDataPresente.create({
                matricula: matricula,
                nome: nome,
                classe: classe,
                serie: serie,
                entrada: date,
                saida: date
            });
            return "Saída Confirmada"
        }
        else {
            await userDataPresente.create({
                matricula: matricula,
                nome: nome,
                classe: classe,
                serie: serie,
                entrada: date,
                saida: null
            });
            return "Presença Confirmada"
        }
    }

    async userLoginCreate(matricula,user,password){
        await bcrypt.hash(password, 10).then((hash)=>{
            userCreate.create({
                matricula:matricula,
                nome: user,
                password: hash
            })

        })
        
    }

    async userLoginCheck(user, plainPassword){
        
        const senhaHash = await userCreate.findOne({
            nome:user
        })
        const checkPassword = await bcrypt.compare(plainPassword, senhaHash.password).then(function(result) {
            // result == true
            return result
        });
    }

    async insertNewData(matricula, nome, classe, serie, email, dataNascimento){
        await dataUser.create({
            matricula: matricula,
            nome:nome,
            classe:classe,
            serie:serie,
            email: email,
            dataNascimento: dataNascimento
        }).then(()=>{
            return "Novo discente criado com sucesso"
        }).catch((err)=>{
            return "Erro ao criar o discente" + err
        })
    }

    async findData(matricula){
        const resultFind = await dataUser.findOne({
            matricula:matricula
        }).then(()=>{
            return resultFind
        }).catch((err)=>{
            return "Nao foi possivel encontrar seus dados"+err
        })
    }
}

module.exports = discentePresente;