const con = require("../conexao/banco")

async function pegarEquipeEducacional(){
    let sql =  `select * from equipeEducacional A `
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
async function pegarProfessor(ID){
    let sql =  `select A.registro, A.nome as nome ,B.nomeCargo  from equipeEducacional A inner join cargo B on  A.IDcargo = B.IDcargo where A.registro = ${ID} `
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


async function postarEquipeEducacional(body){
    let sql =  `insert into equipeEducacional values (${body.registro},"${body.nome}", "", "${body.senha}", ${body.IDcargo})`
    const result = await new Promise((resolve, reject) => {
        con.query(sql, function(erro, result) {
            if (erro) {
                console.log(erro)
                if(erro.code == 'ER_DUP_ENTRY'){
                    reject(409)
                }else{
                    reject(erro)
                }
                
            } else {
                resolve(true);
            }
        });
    });
    console.log(result)
    return result
}

async function alterarSenhaProf(body){
    let sql =  `update equipeEducacional set senha ="${body.senha}" where registro =${body.registro} `
    const result = await new Promise((resolve, reject) => {
        con.query(sql, function(erro, result) {
            if (erro) {
                reject(false)
                
            } else {
                resolve(true);
            }
        });
    });
    return result;
}
async function pegarMensagemNotificacao(registro){
    let sql =  `select textoNotificacaol from equipeEducacional where registro =${registro}`
    const result = await new Promise((resolve, reject) => {
        con.query(sql, function(erro, result) {
            if (erro) {
                reject(false);
            } else {
                resolve(result);
            }
        });
    });
    return result
}
async function alteraMensagemNotificacao(body){
    let sql =  `update equipeEducacional set textoNotificacaol = "${body.texto}" where registro = ${body.registro}`
    const result = await new Promise((resolve, reject) => {
        con.query(sql, function(erro, result) {
            if (erro) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
    return result
}

module.exports = {
    pegarEquipeEducacional, alteraMensagemNotificacao, pegarMensagemNotificacao,postarEquipeEducacional, pegarProfessor, alterarSenhaProf
}