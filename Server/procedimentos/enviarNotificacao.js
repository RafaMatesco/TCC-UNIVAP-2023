const nodemailer = require('nodemailer')
const {pegarAlunosDaTurma} = require('../servicos/procedimentos')



const trasport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure:true,
    auth:{
        user: 'testenotificacaotcc2023@gmail.com', 
        pass: 'lkyhgvtrvwqayrvq'
    }
})

const enviarNotificacao = (IDturma, titulo)=>{
    pegarAlunosDaTurma(IDturma).then((dados)=> {
        dados.forEach(dado => {
            trasport.sendMail({
                from: 'atividade <testenotificacaotcc2023@gmail.com>', 
                to: dado.email,
                subject: "Notificação atividade",
                text: `Olá ${dado.nome}.A atividade ${titulo} acabou de ser postada`
            })
        });
    })
    
}

module.exports = {enviarNotificacao}
