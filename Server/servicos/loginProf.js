const con = require("../conexao/banco")

async function consultaProf(registro,senha){
    let sql =  `select * from equipeEducacional where registro =${registro}  and Senha ="${senha}" `
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
        return {
            "permicao": true,
            "cargo": result[0].IDcargo
        }
    } else {
        return false;
    }
}

module.exports = {
    consultaProf
}
