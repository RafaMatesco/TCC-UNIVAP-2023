const nodemailer = require('nodemailer')
const {pegarAtividades1dias} = require('../servicos/procedimentos')



const trasport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure:true,
    auth:{
        user: 'testenotificacaotcc2023@gmail.com', 
        pass: 'lkyhgvtrvwqayrvq'
    }
})

const enviarNotificacao1dias = ()=>{
    pegarAtividades1dias().then((dados)=> {
        dados.forEach(dado => {
            trasport.sendMail({
                from: 'atividade <testenotificacaotcc2023@gmail.com>', 
                to: dado.email,
                subject: "Notificação atividade",
                text: `Olá ${dado.nome}. Fique atento pois á entrega da atividade ${dado.titulo} é amanha`
            })
        });
    })
    
}

module.exports = enviarNotificacao1dias
