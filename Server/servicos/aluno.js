const con = require("../conexao/banco")


async function pegarAluno(IDaluno){
    let sql =  `select A.*, B.nomeTurma from  aluno A inner join  turma B on A.IDturma = B.IDturma where IDaluno =${IDaluno}`
    const result = await new Promise((resolve, reject) => {
        con.query(sql, function(erro, result) {
            if (erro) {
                console.log(erro)
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

async function pegarAllAlunos(){
    let sql =  `select * from  aluno`
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
async function criarAluno(body){
    let sql =  `insert into aluno value(${body.matricula},"${body.nome}", "${body.email}", "${body.senha}",${body.IDturma})`

    const result = await new Promise((resolve, reject) => {
        con.query(sql, function(erro, result) {
            if (erro) {
                console.log(erro)
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
    
    return result
}
async function alterarAluno(body){
    
    let sql =  `update aluno set nome = "${body.nome}", IDturma = ${body.IDturma}`
    if(body.email!=""){sql+=`,email = "${body.email}"`}
    if(body.senha!=""){sql+=`, senha = "${body.senha}"`}
    sql+=` where IDaluno = ${body.matricula}`
    console.log(sql)
    const result = await new Promise((resolve, reject) => {
        con.query(sql, function(erro, result) {
            if (erro) {
                console.log(false)
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
    return result
}
async function deletarAluno(IDaluno){
    let sql =  `delete from aluno where IDaluno = ${IDaluno}`

    const result = await new Promise((resolve, reject) => {
        con.query(sql, function(erro, result) {
            if (erro) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
    return result
}
module.exports = {
    pegarAluno,
    pegarAllAlunos,
    criarAluno,
    alterarAluno,
    deletarAluno
}