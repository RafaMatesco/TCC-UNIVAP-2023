const {consultaAluno} = require("../servicos/loginAluno")

const crypto = require("crypto");
function criarHashSHA256(inputString) {
    const hash = crypto.createHash("sha256");
    hash.update(inputString);
    return hash.digest("hex");
  }


async function loginAluno(rec,res){                                                 
    try{
        rec.query.senha = criarHashSHA256(rec.query.senha);
        console.log(rec.query.senha);
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