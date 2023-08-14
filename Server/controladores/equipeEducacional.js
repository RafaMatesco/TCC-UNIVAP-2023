const {pegarEquipeEducacional} = require("../servicos/equipeEducacional")


async function getEquipeEducacional(rec,res){     // deleta uma turma                                          
    try{
        res.send( await pegarEquipeEducacional())
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}

module.exports = {
    getEquipeEducacional
}