//Importando Modulos
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dayjs = require('dayjs');
const { boolean } = require('webidl-conversions');




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
    data: String,
    hrEntrada: String,
    hrSaida: String,
    entrou: Number,

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

    async connectionDatabase() {
        if(!this.userName){
            while(true){
                try{
                        const bancoConecta = await mongoose.connect("mongodb://"+this.databaseIP + ":" + this.databasePort, { dbName: "discentePresente" })
                        if(bancoConecta != null){
                            console.log("Banco conectado")
                            break;
                        }
                }
                catch(err){
                }
            }
        }
        else{
                    
            while(true){
            try{
                    const bancoConecta = await mongoose.connect("mongodb://" + this.userName + ":" + this.passwordDatabase + "@" + this.databaseIP + ":" + this.databasePort, { dbName: "discentePresente" })
                    if(bancoConecta != null){
                        console.log("Banco conectado")
                        break;
                    }
            }
            catch(err){
            }


        }


}








    }

    async checkAndProcessExit(matricula, nome, classe, serie) {
        var date = dayjs()

        var horas = date.$H +":" +date.$m

        var mes = date.$M + 1

        var dia = date.$D

        var ano = date.$y


        var dataCompleta = dia + "-" + mes + "-" + ano





        try {
            // Executa a consulta para verificar se já existe algum registro com essa matrícula e data
            var check = await userDataPresente.findOne({
                matricula: matricula,
                data: dataCompleta
            });
        
            // Verifica se encontrou algum registro
            if (check) {
                
                // Se hrSaida for null, atualiza o registro existente
                if (check.hrSaida === null || entrou === 0) {
                    console.log("retornou algo")
                    await userDataPresente.updateOne(
                        { _id: check._id }, // filtro pelo ID do documento encontrado
                        { $set: { hrSaida: horas, entrou: 1 } } // atualiza hrSaida e entrou
                    );
                } else {
                    console.log("retornou algo e nao é nulo")
                    // Se hrSaida não for null, cria um novo registro
                    await userDataPresente.create({
                        matricula: matricula,
                        nome: nome,
                        classe: classe,
                        serie: parseInt(serie),
                        data: dataCompleta,
                        hrEntrada: horas,
                        hrSaida: null,
                        entrou: 0
                    });
                }
            } else {
                // Se não encontrou nenhum registro, cria um novo registro
                console.log("Nao retornou nada")
                console.log(horas)
                await userDataPresente.create({
                    matricula: matricula,
                    nome: nome,
                    classe: classe,
                    serie: parseInt(serie),
                    data: dataCompleta,
                    hrEntrada: horas,
                    hrSaida: null,
                    entrou: 0
                });
            }
        
            
        } catch (error) {
            console.error("Erro ao executar operação:", error);
        }
        

 
    }

    async userLoginCreate(matricula, user, password, funcao) {
        try{
            bcrypt.genSalt(10,(err, salt)=>{
                bcrypt.hash(password, salt, (err, hash)=>{
                
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
        return "Nao foi possivel cadastrar"
    }

    
    
    }

    async userLoginCheck(matricula, password) {
        try{

            const resultFind = await userCreate.findOne({
                matricula:matricula
            })
            
            const resultado = await bcrypt.compare(password, resultFind.password)
            if(resultado == true){

            const token = jwt.sign({
                nome: resultFind.user,
                roles: resultFind.funcao,
            }, process.env.API, { expiresIn: "24h" })
            const result = {
                matricula:resultFind.matricula,
                funcao:resultFind.funcao,
                finalResult:resultado,
                token:token
            }
            return result
        }
        else{
            const result = {
                matricula:resultFind.matricula,
                funcao:resultFind.funcao,
                finalResult:resultado,
            }
            return result
        }


        }
        catch(err){
            return err
        }

    }


    async insertNewData(matricula, nome, classe, serie, email, dataNascimento) {

        try{
            const inserir = dataUser.create({
                matricula: matricula,
                nome: nome,
                classe: classe,
                serie: serie,
                email: email,
                dataNascimento: dataNascimento
            })
        }
        catch(err){
        }


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
    async findPresence(classe, serie) {
        try {
            const resultFind = await userDataPresente.find({
                classe:classe,
                serie:serie
            })
            return resultFind
        }
        catch (err) {
            return err
        }

    }


}

module.exports = discentePresente;