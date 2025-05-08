const nodemailer = require('nodemailer')
const {pegarAtividadesDoDia} = require('../servicos/procedimentos')

const {pegarMensagemNotificacao} = require('../servicos/equipeEducacional')

const trasport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure:true,
    auth:{
        user: 'quadronots@gmail.com',
        pass: 'rsuf malv fxmx tuvd'
    }
})

const enviarNotificacaoDodia= ()=>{
    pegarAtividadesDoDia().then((dados)=> {
        dados.forEach(dado => {
            trasport.sendMail({
                from: 'teste <testenotificacaotcc2023@gmail.com>',
                to: dado.email,
                subject: "Notificação atividade",
                text: `Olá ${dado.nome}. Fique atento pois a entrega da atividade ${dado.titulo} é até hoje`
            })
        });
    })

}
module.exports = enviarNotificacaoDodia

