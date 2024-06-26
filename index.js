//Imports
const express = require('express');
const app = express();
const discentePresente = require('./Database/mongoData');
const auth = require("./Middleware/tokenVerify.js");
const { admin, editor, viewer } = require("./Middleware/userFunctions.js");
require('dotenv').config();

//Mongo Class

    //Usuario, Senha, Localização do Servidor, Porta do Servidor

const mongo = new discentePresente("", "", process.env.IP, process.env.PORTA);
    //FIm

//Fim Imports

//Configurações

app.use(express.urlencoded({extended: false}))
app.use(express.json());

mongo.connectionDatabase();
port = process.env.PORTAPI;



//Fim configurações
//Rotas API
app.get('/', (req,res) =>{
    res.send("Servidor Iniciado");
})

//Rota responsável pelo LOGIN do usuario
app.post('/loginhandle', async (req,res)=>{
    const data = req.body
    const resultado = await mongo.userLoginCheck(data.matricula, data.password)
    if(resultado != null){
        res.send({
            fresultado:resultado.finalResult,
            matricula:resultado.matricula,funcao:resultado.funcao,
            token:resultado.token
        })
        
    }
    else{  
        res.send("Erro, verifique seu usuário ou senha");
    }
})

//Rota responsavel por criar novos logins de usuario
app.post('/loginCreate',[auth, admin], async (req,res)=>{
    const data = req.body
    try{
        mongo.userLoginCreate(data.matricula, data.nome, data.password, data.funcao)
        res.send("Usuário criado com sucesso")
    }
    catch(err){
        res.send("Erro ao criar o usuário, Tente Novamente")
    }
})



//Rota responsavel por adicionar novos dados a collection userData
app.post('/dataCreate',[auth, admin] , async (req,res)=>{
    const data = req.body

    const date = new Date(data.dataNascimento)

    await mongo.insertNewData(data.matricula, data.nome, data.classe,data.serie, data.email, date).then(()=>{
        res.send("OK")
    }).catch((err)=>{
        res.send("Nao foi possivel criar")

    })
    
    
})



//Rota responsavel por consultar dados da collection userData
app.post('/dataFind',[auth, viewer],async (req,res)=>{


    const date = req.body

    try{
        const findResult = await mongo.findData(date.matricula)
        res.send(findResult)
    }
    catch(err){
        return "erro"

    }
})



//Rota responsavel por confirmar a presença dos alunos

app.post('/presenceConfirm', [auth, viewer],(req,res)=>{
    const data = req.body
    const confirm = mongo.checkAndProcessExit(data.matricula, data.nome, data.classe, data.serie);
    res.send(confirm)
})

app.post('/presenceFind', [auth, viewer], async(req, res)=>{
    const data = req.body
    try{
        const something = await mongo.findPresence(data.classe, data.serie)
        console.log(something)
        
        res.send(something)
    }
    catch{
        


    }
    
 




})





    






app.listen(port, ()=>{console.log("ok")})