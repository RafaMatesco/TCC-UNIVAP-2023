const { enviarNotificacaoSenha } = require("../procedimentos/enviarSenha.js");
const {
  pegarAluno,
  pegarAllAlunos,
  criarAluno,
  alterarAluno,
  deletarAluno,
} = require("../servicos/aluno.js");

const crypto = require("crypto");

function criarHashSHA256(inputString) {
  const hash = crypto.createHash("sha256");
  hash.update(inputString);
  return hash.digest("hex");
}

async function getAluno(rec, res) {
  try {
    res.send(await pegarAluno(rec.query.matricula));
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

async function getAllAlunos(rec, res) {
  try {
    res.send(await pegarAllAlunos());
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}
async function postAluno(rec, res) {
  try {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let resultado = "";

    for (let i = 0; i < 5; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      resultado += caracteres.charAt(indiceAleatorio);
    }
    //AQUI ELE PEGA A STRING E ENVIA POR EMAIL
    console.log(resultado);
    enviarNotificacaoSenha(rec.body.nome, resultado, rec.body.email)
    const hash = criarHashSHA256(resultado);
    rec.body.senha = hash;
    res.send(await criarAluno(rec.body));
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}
async function postAlunos(rec, res) {
  try {
    rec.body.forEach(async (aluno) => {
      const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      let resultado = "";

      for (let i = 0; i < 5; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        resultado += caracteres.charAt(indiceAleatorio);
      }
      //rec.body.senha = resultado; AQUI ELE PEGA A STRING E ENVIA POR EMAIL

      const hash = criarHashSHA256(resultado);
      aluno.senha = hash;
      await criarAluno(aluno);
    });
    res.send(true);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}
async function putAluno(rec, res) {
  try {
    if(rec.body.senha != ''){
      rec.body.senha = criarHashSHA256(rec.body.senha);
    }
    res.send(await alterarAluno(rec.body));
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}
async function deleteAluno(rec, res) {
  try {
    res.send(await deletarAluno(rec.query.matricula));
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

module.exports = {
  getAluno,
  getAllAlunos,
  postAluno,
  postAlunos,
  putAluno,
  deleteAluno,
};
