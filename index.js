//Imports
const express = require('express');
const app = express();
const discentePresente = require('./Database/mongoData');
const bodyParser = require('body-parser')


const mongo = new discentePresente("root", "victor", "127.0.0.1", 30300);

//Fim Imports

//Configurações

app.use(bodyParser.urlencoded(bodyParser.urlencoded({extended: true})))

mongo.connectionDatabase();
port = 9010;



//Fim configurações
//Rotas API
app.get('/', (req,res) =>{
    res.send("Victor");
})

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

app.post('/dataCreate', async (req,res)=>{
    const insertData = await mongo.insertNewData(req.body.matricula, req.body.nome, req.body.classe,req.body.serie, req.body.email, req.body.dataNascimento)
    
    res.send(insertData)
    
})
app.post('/dataFind', (req,res)=>{
    const findResult = mongo.findData({matricula:req.body.matricula})
    res.send(findResult)
    
})

app.post('/presenceConfirm', (req,res)=>{
    mongo.checkAndProcessExit();

    res.send()





})






app.listen(port, ()=>{console.log("ok")})