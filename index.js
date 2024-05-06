//Imports
const express = require('express');
const app = express();
const discentePresente = require('./Database/mongoData');
const bodyParser = require('body-parser')

//Mongo Class

    //Usuario, Senha, Localização do Servidor, Porta do Servidor

const mongo = new discentePresente("root", "victor", "127.0.0.1", 30300);
    //FIm

//Fim Imports

//Configurações

app.use(express.urlencoded({extended: false}))
app.use(express.json());

mongo.connectionDatabase();
port = 9010;



//Fim configurações
//Rotas API
app.get('/', (req,res) =>{
    res.send("Victor");
})
//Rota responsável pelo LOGIN do usuario
app.post('/loginhandle', async (req,res)=>{
    matricula = req.body.nome
    password = req.body.password

    const resultado = await mongo.userLoginCheck(nome, password)

    if(resultado == true){
        res.send({matricula:matricula, resultado:resultado})
    }
    else{
        res.send(resultado)
    }
})
//Rota responsavel por adicionar novos dados a collection userData
app.post('/dataCreate', async (req,res)=>{
    const data = req.body

    const date = new Date(data.dataNascimento)

    await mongo.insertNewData(data.matricula, data.nome, data.classe,data.serie, data.email, date)

    await console.log(data.matricula)
    
    res.send("OK")
    
})



//Rota responsavel por consultar dados da collection userData
app.post('/dataFind', async (req,res)=>{


    const date = req.body

    try{
        const findResult = await mongo.findData(date.matricula)
        console.log(findResult)
        res.send(findResult)
    }
    catch(err){
        return "erro"

    }
    
    
    

})



//Rota responsavel por confirmar a presença dos alunos

app.post('/presenceConfirm', (req,res)=>{
    const confirm = mongo.checkAndProcessExit();
    res.send(confirm)
})

app.listen(port, ()=>{console.log("ok")})