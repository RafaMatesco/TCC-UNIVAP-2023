const con = require("../conexao/banco")

async function consultaAluno(matricula,senha){
    let sql =  `select * from aluno where IDaluno =${matricula}  and Senha ="${senha}" `
    
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
        return "true";
    } else {
        return "false";
    }
}

module.exports = {
    consultaAluno
}
