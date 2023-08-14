const {pegarAtividadesProf, pegarAtividadesAluno,pegarAtividade,pegarAtividadesRealizadasAluno, postarAtividades, alterarAtividades, excluirAtividades, postarAtividadeRealizada, pegarAtividadesProfArquivadas} = require("../servicos/atividades")
const {enviarNotificacao} = require("../procedimentos/enviarNotificacao")
  
async function getAtividadesProf(rec,res){                                                 
    try{
        res.send( await pegarAtividadesProf(rec.query.registro))
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}
async function getAtividade(rec,res){                                                 
    try{
        res.send( await pegarAtividade(rec.query.IDpostagem))
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}
async function getAtividadesAluno(rec,res){                                                 
    try{
        res.send( await pegarAtividadesAluno(rec.query.turma))
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}
async function postAtividades(rec,res){                                                 
    try{
        if(await postarAtividades(rec.body)){
            enviarNotificacao(rec.body.IDTurma, rec.body.titulo)
            res.send(true)
        }
        
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}
async function putAtividades(rec,res){                                                 
    try{
        
        res.send( await alterarAtividades(rec.body))
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}
async function deleteAtividades(rec,res){                                                 
    try{
        
        res.send( await excluirAtividades(rec.query.IDpostagem))
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}

async function postMarcarRealizada(rec,res){                                                 
    try{
        
        res.send( await postarAtividadeRealizada(rec.body))
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}
async function getAtividadeRealizada(rec,res){                                                 
    try{
        
        res.send( await pegarAtividadesRealizadasAluno(rec.query.matricula))
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}
async function getAtividadeProfArquivadas(rec,res){                                                 
    try{
        
        res.send( await pegarAtividadesProfArquivadas(rec.query.registro))
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}

module.exports = {
    getAtividadesProf,
    getAtividade,
    getAtividadesAluno,
    postAtividades,
    putAtividades,
    deleteAtividades,
    postMarcarRealizada,
    getAtividadeRealizada,
    getAtividadeProfArquivadas

}