const {consultaAluno} = require("../servicos/loginAluno")



async function loginAluno(rec,res){                                                 
    try{
        res.send(await consultaAluno(rec.query.matricula, rec.query.senha))
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}

module.exports = {
    loginAluno
}