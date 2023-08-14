const con = require("../conexao/banco")


async function pegarAtividadesProf(registro){
    let sql =  `select A.IDpostagem,A.tipoPostagem,DATE_FORMAT(A.DataPostagem,'%d/%m/%Y') as DataPostagem,DATE_FORMAT(A.Datavencimento,'%d/%m/%Y') as Datavencimento ,
    A.titulo, A.texto, A.caminhoArquivo, A.IDturma ,B.nomeTurma from postagem A inner join turma B on A.IDturma=B.IDturma where registro=${registro} and A.arquivada = 0 `
    
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

async function pegarAtividadesProfArquivadas(registro){
    let sql =  `select A.IDpostagem,A.tipoPostagem,DATE_FORMAT(A.DataPostagem,'%d/%m/%Y') as DataPostagem,DATE_FORMAT(A.Datavencimento,'%d/%m/%Y') as Datavencimento ,
    A.titulo, A.texto, A.caminhoArquivo, A.IDturma ,B.nomeTurma from postagem A inner join turma B on A.IDturma=B.IDturma where registro=${registro} and A.arquivada = 1 `
    
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
async function pegarAtividadesAluno(turma){
    let sql =  `SELECT  A.IDpostagem,A.tipoPostagem,DATE_FORMAT(A.DataPostagem,'%d/%m/%Y') as DataPostagem,DATE_FORMAT(A.Datavencimento,'%d/%m/%Y') as Datavencimento ,
    A.titulo, A.texto, A.caminhoArquivo, B.nomeadm as nomeProf FROM postagem A inner join  equipeEducacional B on A.registro = B.registro LEFT JOIN atividadesrealizadas C on A.IDpostagem = C.IDpostagem WHERE C.IDpostagem is null and A.IDturma=${turma}  and A.arquivada = 0 order by A.Datavencimento `
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

async function pegarAtividadesRealizadasAluno(matricula){
    let sql =  `
    SELECT  A.IDpostagem,A.tipoPostagem,DATE_FORMAT(A.DataPostagem,'%d/%m/%Y') as DataPostagem,DATE_FORMAT(A.Datavencimento,'%d/%m/%Y') as Datavencimento ,
    A.titulo, A.texto, A.caminhoArquivo, B.nomeadm as nomeProf FROM postagem A inner join  equipeEducacional B on A.registro = B.registro inner JOIN atividadesrealizadas C on A.IDpostagem = C.IDpostagem WHERE C.IDaluno = ${matricula} and A.arquivada = 0  order by A.Datavencimento 
`
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

async function pegarAtividade(IDatividade){
    let sql =  `select * from postagem where IDpostagem=${IDatividade}`
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
async function postarAtividades(body){

    let sql =  `insert into postagem values(null,"${body.tipoPostagem}","${body.dataPostagem}","${body.dataVencimento}","${body.titulo}","${body.texto}","${body.arquivo}",${body.arquivada},${body.registro},${body.IDTurma} )`;
    const result = await new Promise((resolve, reject) => {
        con.query(sql, function(erro, result) {
            if (erro) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
    return result;
}

async function postarAtividadeRealizada(body){

    let sql =  `insert into atividadesrealizadas values(null, ${body.IDatividade}, ${body.matricula})`;
    const result = await new Promise((resolve, reject) => {
        con.query(sql, function(erro, result) {
            if (erro) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
    return result;
}

async function alterarAtividades(body){

    let sql =  `update postagem set tipoPostagem =${body.tipoPostagem} , DataPostagem = "${body.dataPostagem}", Datavencimento = "${body.dataVencimento}", titulo = "${body.titulo}", texto = "${body.texto}", caminhoArquivo = "${body.arquivo}", idTurma =${body.IDTurma} where IDpostagem = ${body.IDpostagem}`
    const result = await new Promise((resolve, reject) => {
        con.query(sql, function(erro, result) {
            if (erro) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
    return result;
}


async function excluirAtividades(IDpostagem){

    let sql =  `delete from postagem where IDpostagem =${IDpostagem}`
    const result = await new Promise((resolve, reject) => {
        con.query(sql, function(erro, result) {
            if (erro) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
    return result;
}


module.exports = {
    pegarAtividadesProf,
    pegarAtividadesAluno,
    pegarAtividade,
    postarAtividades,
    alterarAtividades,
    excluirAtividades,
    postarAtividadeRealizada,
    pegarAtividadesRealizadasAluno,
    pegarAtividadesProfArquivadas
}