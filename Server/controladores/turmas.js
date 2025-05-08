const {pegarTurmasProf,pegarRelacoes, postarTurmasProf, excluirTurmasProf,pegarTurmaAluno, postarTurmas, pegarTurmas, alterarTurmas, excluirTurmas,pegarAllAlunos } = require("../servicos/turmas")

async function getTurmasProf(rec,res){  //pega as turmas que estao relacionadas com o professor                                           
    try{
        res.send( await pegarTurmasProf(rec.query.registro))
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}
async function getRelacoes(rec,res){  //pega as turmas que estao relacionadas com o professor
    try{
        res.send( await pegarRelacoes())
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}
async function postTurmasXprof(rec,res){    // cria a relação de uma turma com um professor
    try{
        res.send( await postarTurmasProf(rec.body))
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}async function deleteTurmasXprof(rec,res){     // exclui a relação de um turma com um professor                                               
    try{
        res.send( await excluirTurmasProf(rec.query.IDrelacao))
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}
async function getTurmaAluno(rec,res){      // pega a turma que um aluno pertence                                           
    try{
        res.send( await pegarTurmaAluno(rec.query.registro))
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}

async function postTurmas(rec,res){     //cria uma turma
    try{
        res.send(await postarTurmas(rec.body))
        
        
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
async function getTurmas(rec,res){       //pega todas as turmas                                          
    try{
        res.send( await pegarTurmas())
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}
async function putTurmas(rec,res){    // altera uma turma                             
    try{
        res.send( await alterarTurmas(rec.body))
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}
async function deleteTurmas(rec,res){     // deleta uma turma
    try{
        res.send( await excluirTurmas(rec.query.IDturma))
    }catch(error)
    {
        if(error == 409){
            res.status(409)
            res.send("referencia em outras tabelas")
        }
        res.status(500)
        res.send(error.message)
    }
}
async function getAllAlunos(rec,res){
    try{
        res.send(await pegarAllAlunos(rec.query.IDturma) )
    }catch(error){
        res.status(500)
        res.send(error.message)

    }
}

module.exports = {
    getTurmasProf,
    getTurmaAluno,
    postTurmasXprof,
    deleteTurmasXprof,
    postTurmas,
    getTurmas,
    putTurmas,
    deleteTurmas,
    getRelacoes,
    getAllAlunos
}