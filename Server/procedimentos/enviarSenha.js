const nodemailer = require('nodemailer')



const trasport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure:true,
    auth:{
        user: 'quadronots@gmail.com',
        pass: 'rsuf malv fxmx tuvd'
    }
})


const enviarNotificacaoSenha = async (nome, senha, email)=>{
    console.log(email)
    console.log(senha)
    console.log(nome)
    try{
        await trasport.sendMail({
            from: 'atividade <testenotificacaotcc2023@gmail.com>',
            to: email,
            subject: "Notificação atividade",
            text: `Olá ${nome}.
            A sua senha de acesso ao quadro de avisos é : ${senha} `
        })
    }catch(err){
        console.log(err)
    }
}

module.exports = {enviarNotificacaoSenha}
