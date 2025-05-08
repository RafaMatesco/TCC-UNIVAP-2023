const con = require("../conexao/banco");

async function pegarAtividadesProf(registro) {
  let sql = `select A.IDpostagem,A.tipoPostagem,DATE_FORMAT(A.DataPostagem,'%d/%m/%Y') as DataPostagem,DATE_FORMAT(A.Datavencimento,'%d/%m/%Y') as Datavencimento , A.Datavencimento as dateVenc, A.titulo, A.texto, A.caminhoArquivo, A.idturmaXequipeEducacional ,C.nomeTurma 
  from postagem A 
  inner join turmaxequipeeducacional B on A.idturmaXequipeEducacional=B.idturmaXequipeEducacional 
  left join turma C on B.IDturma = C.IDturma
  where B.idturmaXequipeEducacional=${registro} and A.arquivada = 0 
  order by A.Datavencimento`;

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
    return result;
  } else {
    return "false";
  }
}

async function pegarAtividadesProfArquivadas(registro) {
  let sql = `select A.IDpostagem,A.tipoPostagem,DATE_FORMAT(A.DataPostagem,'%d/%m/%Y') as DataPostagem,DATE_FORMAT(A.Datavencimento,'%d/%m/%Y') as Datavencimento , A.titulo, A.texto, A.caminhoArquivo, A.idturmaXequipeEducacional ,C.nomeTurma 
  from postagem A 
  inner join turmaxequipeeducacional B on A.idturmaXequipeEducacional=B.idturmaXequipeEducacional 
  left join turma C on B.IDturma = C.IDturma
  where B.idturmaXequipeEducacional=${registro} and A.arquivada = 1 
  order by A.Datavencimento`;

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
    return result;
  } else {
    return "false";
  }
}
async function pegarAtividadesAluno(turma, IDaluno) {
  let sql = `SELECT  A.IDpostagem,A.tipoPostagem,DATE_FORMAT(A.DataPostagem,'%d/%m/%Y') as DataPostagem,DATE_FORMAT(A.Datavencimento,'%d/%m/%Y') as Datavencimento , A.Datavencimento as dateVenc, 
  A.titulo, A.texto, A.caminhoArquivo, B.nome as nomeProf 
  FROM postagem A
  left join turmaxequipeeducacional txe on txe.idturmaXequipeEducacional = A.idturmaXequipeEducacional
  inner join equipeEducacional B on txe.registro = B.registro 
  WHERE txe.IDturma = ${turma} and A.arquivada = ${IDaluno} order by A.Datavencimento; `;
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
    return result;
  } else {
    return "false";
  }
}

async function pegarAtividadesRealizadasAluno(matricula) {
  let sql = `
  SELECT  A.IDpostagem,A.tipoPostagem,DATE_FORMAT(A.DataPostagem,'%d/%m/%Y') as DataPostagem,DATE_FORMAT(A.Datavencimento,'%d/%m/%Y') as Datavencimento ,
  A.titulo, A.texto, A.caminhoArquivo,A.Datavencimento as dateVenc, B.nome as nomeProf 
  FROM postagem A 
left join turmaxequipeeducacional txe on txe.idturmaXequipeEducacional = A.idturmaXequipeEducacional
inner join equipeEducacional B on txe.registro = B.registro 
  inner JOIN atividadesrealizadas C on A.IDpostagem = C.IDpostagem 
  WHERE C.IDaluno = ${matricula} and A.arquivada = 0  
  order by A.Datavencimento 
`;
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
    return result;
  } else {
    return "false";
  }
}

async function pegarAtividadesVencidasAluno(IDturma) {
  let sql = `
  SELECT  A.IDpostagem,A.tipoPostagem,DATE_FORMAT(A.DataPostagem,'%d/%m/%Y') as DataPostagem,DATE_FORMAT(A.Datavencimento,'%d/%m/%Y') as Datavencimento ,
  A.titulo, A.texto, A.caminhoArquivo, B.nome as nomeProf 
  FROM postagem A 
left join turmaxequipeeducacional txe on txe.idturmaXequipeEducacional = A.idturmaXequipeEducacional
inner join equipeEducacional B on txe.registro = B.registro 
  WHERE txe.IDturma = 1 and A.arquivada = 0 and A.Datavencimento < curdate()
  order by A.Datavencimento; 
`;  
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
    return result;
  } else {
    return "false";
  }
}

async function pegarAtividade(IDatividade) {
  let sql = `select *,DATE_FORMAT(DataPostagem, '%Y-%m-%d') AS dataPostagemFormatada,DATE_FORMAT(DataVencimento, '%Y-%m-%d') AS dataVencimentoFormatada  from postagem where IDpostagem=${IDatividade}`;
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
    return result;
  } else {
    return "false";
  }
}
async function postarAtividades(body) {
  let sql = `insert into postagem values(null,"${body.tipoPostagem}","${body.dataPostagem}","${body.dataVencimento}","${body.titulo}","${body.texto}","${body.arquivo}",${body.arquivada},(SELECT te.idturmaXequipeEducacional FROM turmaxequipeeducacional te WHERE te.registro = ${body.registro} AND te.IDturma = ${body.IDTurma}) )`;
  const result = await new Promise((resolve, reject) => {
    con.query(sql, function (erro, result) {
      if (erro) {
        console.log(erro);
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
  return result;
}

async function postarAtividadeRealizada(body) {
  let sql = `insert into atividadesrealizadas values(null, ${body.IDatividade}, ${body.matricula}, "${body.texto}", "${body.arquivo}",now())`;
  const result = await new Promise((resolve, reject) => {
    con.query(sql, function (erro, result) {
      if (erro) {
        console.log(erro);
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
  return result;
}

async function alterarAtividades(body) {
  let sql = `update postagem set tipoPostagem =${body.tipoPostagem}, arquivada = ${body.arquivada} , DataPostagem = "${body.dataPostagemFormatada}", Datavencimento = "${body.dataVencimentoFormatada}", titulo = "${body.titulo}", texto = "${body.texto}", caminhoArquivo = "${body.arquivo}", idTurma =${body.IDturma} where IDpostagem = ${body.IDpostagem}`;
  const result = await new Promise((resolve, reject) => {
    con.query(sql, function (erro, result) {
      if (erro) {
        console.log(erro);
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
  return result;
}

async function excluirAtividades(IDpostagem) {
  let sql1 = `delete from atividadesrealizadas where IDpostagem =${IDpostagem}`;
  let sql2 = `delete from postagem where IDpostagem =${IDpostagem}`;
  const result = await new Promise((resolve, reject) => {
    con.query(sql1, function (erro, result) {
      if (erro) {
        reject(erro);
      } else {
        con.query(sql2, function (erro, result) {
          if (erro) {
            reject(erro);
          } else {
            resolve(true);
          }
        });
      }
    });
  });
  return result;
}

async function pegarAtividadesRealizadasProf(IDpostagem) {
  let sql = `select A.*,DATE_FORMAT(A.dataRetorno, '%d/%m/%Y') AS dataRetornoFormatada,B.nome as nomeAluno  
    from  atividadesrealizadas A 
    inner join aluno B on A.IDaluno = B.IDaluno 
    where IDpostagem= ${IDpostagem}`;
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
    return result;
  } else {
    return "false";
  }
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
  pegarAtividadesVencidasAluno,
  pegarAtividadesProfArquivadas,
  pegarAtividadesRealizadasProf,
};
