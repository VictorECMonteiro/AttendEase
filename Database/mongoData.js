//Importando Modulos
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');




const { Schema } = mongoose
//Fim
//Schemas e Models
const userdatas = new Schema({
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
    password: String,
    funcao: String,
});
const schoolClass = new Schema({
    classe: String,
    serie: Number,
});
const dataUser = mongoose.model("dataUser", userdatas)

const userCreate = mongoose.model("userLogin", userLogin);
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
    constructor(userName, passwordDatabase, databaseIP, databasePort) {
        this.userName = userName;
        this.passwordDatabase = passwordDatabase;
        this.databaseIP = databaseIP;
        this.databasePort = databasePort;
    }

    connectionDatabase() {

        console.log(this.userName)

        mongoose.connect("mongodb://" + this.userName + ":" + this.passwordDatabase + "@" + this.databaseIP + ":" + this.databasePort, { dbName: "discentePresente" }).then(() => {
            console.log("OK");
        }).catch((err) => {
            console.log(err)
            return
        })

    }

    async checkAndProcessExit(matricula, nome, classe, serie) {

        const checkEntrada = await userDataPresente.findOne({
            nome: nome,
            entrada: date.getDate
        });

        if (checkEntrada.saida == null) {
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

    async userLoginCreate(matricula, user, password, funcao) {
        try{
            bcrypt.genSalt(10,(err, salt)=>{
                bcrypt.hash(password, salt, (err, hash)=>{
                    console.log(hash)
                    userCreate.create({
                        matricula: matricula,
                        nome: user,
                        password: hash,
                        funcao: funcao
                    })    
                })
        }
    )}
    catch(err){
        console.log("Não foi possivel cadastrar")
    }

    
    
    }

    async userLoginCheck(user, password) {
        try{

            const resultFind = await userCreate.findOne({
                nome:user
            })
            

            const resultado = await bcrypt.compare(password, resultFind.password)

            const token = jwt.sign({
                nome: resultFind.user,
                roles: resultFind.funcao,
            }, "VictorCorreia", { expiresIn: "15m" });

            const result = {
                funcao:resultFind.funcao,
                finalResult:resultado,
                token:token
            }
            return result

        }
        catch(err){
            return err
            console.log("ERRO"+err)
        }




    }


    async insertNewData(matricula, nome, classe, serie, email, dataNascimento) {
        const inserir = dataUser.create({
            matricula: matricula,
            nome: nome,
            classe: classe,
            serie: serie,
            email: email,
            dataNascimento: dataNascimento
        }).then(()=>{
            return "OK"

        }).catch((err)=>{
            return err
        })
    }

    // Metodo de Encontrar Dados
    async findData(matricula) {
        try {
            const resultFind = await dataUser.findOne({
                matricula: matricula
            })
            return resultFind
        }
        catch (err) {
            return err
        }

    }
    async findDataFunc(matricula) {
        try {
            const resultFind = await userCreate.findOne({
                nome:matricula
            })
            return resultFind
        }
        catch (err) {
            return err
        }

    }


}

module.exports = discentePresente;