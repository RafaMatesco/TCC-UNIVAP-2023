const {pegarEquipeEducacional, alteraMensagemNotificacao, pegarMensagemNotificacao,postarEquipeEducacional, pegarProfessor, alterarSenhaProf} = require("../servicos/equipeEducacional")


async function getEquipeEducacional(rec,res){
    try{
        res.send( await pegarEquipeEducacional())
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}

async function postEquipeEducacional(rec,res){
    try{
        res.send( await postarEquipeEducacional(rec.body))
    }catch(error)
    {
        if(error == 409){
            
            res.status(409)
            res.send("ID ja cadastrado")
        }else{
            res.status(500)
            res.send(error.message)
        }
    }
}
async function putSenha(rec,res){
    try{
        res.send( await alterarSenhaProf(rec.body))
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}
async function updateMesagemNotificacao(rec,res){
    try{
        res.send( await alteraMensagemNotificacao(rec.body))
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}
async function getMensagemNotificacao(rec,res){
    try{
        res.send( await pegarMensagemNotificacao(rec.query.registro))
    }catch(error)
    {
        console.log(error)
        res.status(500)
        res.send(error.message)
    }
}
async function getProfessor(rec, res){
    try{
        res.send(await pegarProfessor(rec.query.registro))
    }catch(error){
        console.log(error)
        res.status(500)
        res.send(error.message)
    }
}
module.exports = {
    getEquipeEducacional, updateMesagemNotificacao, getMensagemNotificacao, postEquipeEducacional, getProfessor, putSenha
}