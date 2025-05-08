const con = require("../conexao/banco")

async function pegarTurmasProf(registro) {
    let sql = `select A.idturmaXequipeEducacional, B.nomeTurma,B.IDturma from turmaxequipeeducacional A inner join turma B on A.IDturma=B.IDturma where registro =${registro}`

    const result = await new Promise((resolve, reject) => {
        con.query(sql, function (erro, result) {
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
async function pegarTurmaAluno(registro) {
    let sql = `select B.nomeTurma,B.IDturma from aluno A inner join turma B on A.IDturma=B.IDturma where IDaluno =${registro}`

    const result = await new Promise((resolve, reject) => {
        con.query(sql, function (erro, result) {
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
async function pegarRelacoes() {
    let sql = `

    SELECT 
    A.idturmaXequipeeducacional AS IDrelacao,
    A.registro,
    B.nome,
    A.IDturma,
    C.nomeTurma
FROM
    turmaxequipeeducacional A
        INNER JOIN
    equipeEducacional B ON A.registro = B.registro
        INNER JOIN
    turma C ON A.IDturma = C.IDturma
WHERE
    B.IDcargo != 3`

    const result = await new Promise((resolve, reject) => {
        con.query(sql, function (erro, result) {
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
async function postarTurmasProf(body) {
    let sql = `insert into turmaxequipeeducacional values(null,${body.registro},${body.IDturma});`
    const result = await new Promise((resolve, reject) => {
        con.query(sql, function (erro, result) {
            if (erro) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
    return result;

}
async function excluirTurmasProf(IDrelacao) {
    let sql = `delete from turmaxequipeeducacional where idturmaXequipeeducacional=${IDrelacao}`
    const result = await new Promise((resolve, reject) => {
        con.query(sql, function (erro, result) {
            if (erro) {
                reject(false);
            } else {
                resolve(true);
            }
        })
    })
    return result;

}
async function postarTurmas(body) {
    let sql = `insert into turma values(${body.IDturma},"${body.turma}");`
    const result = await new Promise((resolve, reject) => {
        con.query(sql, function (erro, result) {
            if (erro) {
                if (erro.code == 'ER_DUP_ENTRY') {
                    reject(409)
                }
                reject(erro)

            } else {
                resolve(true);
            }
        });
    });
    console.log(result)
    return result
}
async function pegarTurmas() {
    let sql = `select * from turma where IDturma <> 0`

    const result = await new Promise((resolve, reject) => {
        con.query(sql, function (erro, result) {
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
async function alterarTurmas(body) {
    let sql = `update turma set nomeTurma = "${body.turma}" where IDturma = ${body.IDturma};`
    const result = await new Promise((resolve, reject) => {
        con.query(sql, function (erro, result) {
            if (erro) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
    return result
}
async function excluirTurmas(IDturma) {
    let sql = `delete from turma where IDturma=${IDturma}`
    const result = await new Promise((resolve, reject) => {
        con.query(sql, function (erro, result) {
            if (erro) {
                if (erro.code == "ER_ROW_IS_REFERENCED_2") {
                    reject(409)
                }
                reject(erro)
            } else {
                resolve(true);
            }
        });
    });
    return result
}
async function pegarAllAlunos(IDturma) {
    let sql = `select IDaluno, nome from aluno where IDturma =${IDturma}`
    const result = await new Promise((resolve, reject) => {
        con.query(sql, function (erro, result) {
            if (erro) {
                reject(erro)
            } else {
                resolve(result);
            }
        });
    });
    return result
}
module.exports = {
    postarTurmasProf,
    excluirTurmasProf,
    pegarTurmaAluno,
    pegarTurmasProf,
    postarTurmas,
    pegarTurmas,
    alterarTurmas,
    excluirTurmas,
    pegarRelacoes,
    pegarAllAlunos
}