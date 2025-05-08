const nodemailer = require('nodemailer')
const {pegarAlunosDaTurma} = require('../servicos/procedimentos')
const {pegarMensagemNotificacao}= require('../servicos/equipeEducacional')
const con = require('../conexao/banco')



const trasport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure:true,
    auth:{
        user: 'quadronots@gmail.com',
        pass: 'rsuf malv fxmx tuvd'
    }
})


const enviarNotificacao = async (IDturma,IDalunos, titulo, registro)=>{
    const msg = await new Promise((resolve, reject)=>{
        pegarMensagemNotificacao(registro).then((dado)=>{
            if(dado!=undefined){
                resolve(dado[0].mensagemNotificacao)
            }else{
                reject("")
            }
        })
    })/*
    pegarAlunosDaTurma(IDturma,IDalunos).then((dados)=> {
        dados.forEach((dado) => {
            trasport.sendMail({
                from: 'atividade <testenotificacaotcc2023@gmail.com>',
                to: dado.email,
                subject: "Notificação atividade",
                text: `Olá ${dado.nome}.
                A atividade ${titulo} acabou de ser postada
                ${msg}
                `
            })
        });
    })*/
    
}

module.exports = {enviarNotificacao}
