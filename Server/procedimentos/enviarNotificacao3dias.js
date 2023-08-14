const nodemailer = require('nodemailer')
const {pegarAtividades3dias} = require('../servicos/procedimentos')



const trasport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure:true,
    auth:{
        user: 'testenotificacaotcc2023@gmail.com', 
        pass: 'lkyhgvtrvwqayrvq'
    }
})

const enviarNotificacao3dia = ()=>{
    pegarAtividades3dias().then((dados)=> {
        dados.forEach(dado => {
            trasport.sendMail({
                from: 'teste <testenotificacaotcc2023@gmail.com>', 
                to: dado.email,
                subject: "Notificação atividade",
                text: `Olá ${dado.nome}. Fique atento pois a atividade ${dado.titulo} esta perto da entrega`
            })
        });
    })
    
}
module.exports = enviarNotificacao3dia

