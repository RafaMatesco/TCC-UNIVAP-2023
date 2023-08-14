const {consultaProf} = require("../servicos/loginProf")

async function loginProf(rec,res){                                                 
    try{
        res.send( await consultaProf(rec.query.id, rec.query.senha))
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}

module.exports = {
    loginProf
}