const {pegarAluno,pegarAllAlunos, criarAluno, alterarAluno, deletarAluno} = require("../servicos/aluno.js")

async function getAluno(rec, res){

    try{
        res.send( await pegarAluno(rec.query.matricula))
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}

async function getAllAlunos(rec, res){

    try{
        res.send( await pegarAllAlunos())
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}
async function postAluno(rec, res){

    try{
        console.log(rec.body)
        res.send( await criarAluno(rec.body))
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}
async function putAluno(rec, res){

    try{
        
        res.send( await alterarAluno(rec.body))
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}
async function deleteAluno(rec, res){

    try{
        
        res.send( await deletarAluno(rec.query.matricula))
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}


module.exports ={
    getAluno,
    getAllAlunos,
    postAluno,
    putAluno,
    deleteAluno
}