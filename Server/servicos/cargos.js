const con = require("../conexao/banco")

async function pegarCargos(){
    let sql =  `select * from cargo`
    const result = await new Promise((resolve, reject) => {
        con.query(sql, function(erro, result) {
            if (erro) {
                reject(erro);
            } else {
                resolve(result);
            }
        });
    });
    if (result.length > 0) {
        return result
    } else {
        return "false";
    }
}

module.exports = {
    pegarCargos
}