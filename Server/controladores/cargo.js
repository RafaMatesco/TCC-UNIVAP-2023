const { pegarCargos } = require("../servicos/cargos")


async function getCargos(rec,res){
    try{
        res.send( await pegarCargos())
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}

module.exports = {
    getCargos
}