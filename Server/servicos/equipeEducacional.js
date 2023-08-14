const con = require("../conexao/banco")

async function pegarEquipeEducacional(){
    let sql =  `select * from equipeEducacional A inner join cargo B on A.IDcargo = B.IDcargo `
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
    pegarEquipeEducacional
}