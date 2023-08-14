const con = require("../conexao/banco")


async function pegarAtividades3dias(){
    let sql =  `select B.nome, B.email, A.titulo  from postagem A inner join aluno B on A.IDturma = B.IDturma LEFT JOIN atividadesrealizadas C on B.IDaluno = C.IDaluno WHERE C.IDpostagem is null and  datediff( A.Datavencimento, now()) <=3 and  datediff( A.Datavencimento, now()) >1  ;`
    
    const result = await new Promise((resolve, reject) => {
        con.query(sql, function(erro, result) {
            if (erro) {
                reject(erro);
            } else {
                resolve(result);
            }
        })
    })
    if (result.length > 0) {
        return result
    } else {
        return "false";
    }
}

async function pegarAtividades1dias(){
    let sql =  `select B.nome, B.email, A.titulo  from postagem A inner join aluno B on A.IDturma = B.IDturma LEFT JOIN atividadesrealizadas C on B.IDaluno = C.IDaluno WHERE C.IDpostagem is null and  datediff( A.Datavencimento, now()) =0 ;`
    
    const result = await new Promise((resolve, reject) => {
        con.query(sql, function(erro, result) {
            if (erro) {
                reject(erro);
            } else {
                resolve(result);
            }
        })
    })
    if (result.length > 0) {
        return result
    } else {
        return "false";
    }
}

async function pegarAtividadesDoDia(){
    let sql =  `select B.nome, B.email, A.titulo  from postagem A inner join aluno B on A.IDturma = B.IDturma LEFT JOIN atividadesrealizadas C on B.IDaluno = C.IDaluno WHERE C.IDpostagem is null and  datediff( A.Datavencimento, now()) =-1 ;`
    
    const result = await new Promise((resolve, reject) => {
        con.query(sql, function(erro, result) {
            if (erro) {
                reject(erro);
            } else {
                resolve(result);
            }
        })
    })
    if (result.length > 0) {
        return result
    } else {
        return "false";
    }
}


async function pegarAlunosDaTurma(IDaluno){
    let sql =  `select nome, email from aluno where IDturma = ${IDaluno}`
    
    const result = await new Promise((resolve, reject) => {
        con.query(sql, function(erro, result) {
            if (erro) {
                reject(erro);
            } else {
                resolve(result);
            }
        })
    })
    if (result.length > 0) {
        return result
    } else {
        return "false";
    }
}


module.exports = {
    pegarAtividades3dias,
    pegarAtividades1dias,
    pegarAtividadesDoDia,
    pegarAlunosDaTurma
}