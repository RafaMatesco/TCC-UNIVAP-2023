const express = require("express")
const bodyParser = require('body-parser')
const cors = require("cors")
const app = express()
const swaggerUi = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const cron = require('node-cron');


//rotas
const rotaLoginProfessor = require("./rotas/loginProf")
const rotaLoginAluno = require("./rotas/loginAluno")
const rotaAtividades= require("./rotas/atividades")
const rotaTurmas = require("./rotas/turmas")
const rotaArquivos = require("./rotas/arquivos")
const rotaAluno = require("./rotas/aluno")
const rotaEquipeEducacional = require("./rotas/equipeEducacional")
const rotaCargos = require("./rotas/cargos")

//procedimentos
const enviarNotificacao3dias = require('./procedimentos/enviarNotificacao3dias')
const enviarNotificacao1dia = require('./procedimentos/enviarNotificacao1dia')
const enviarNotificacaoDodia = require('./procedimentos/enviaNotificacaoDoDia')

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: "API do Quadro de avisos",
        version: '1.0.0',
        description: "quadro de avisos para facilitar a comunicação e os estudos do alunos"
      },
    },
    apis: ['./rotas/*.js']
  }
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors({origin:"*"}))
// esse process é usado qd o back end for hospedado online
const port = process.env.PORT || 8080


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)))
app.use('/loginProf',rotaLoginProfessor)
app.use('/loginAluno',rotaLoginAluno)
app.use('/atividades', rotaAtividades)
app.use('/turmas',rotaTurmas)
app.use('/arquivos',rotaArquivos)
app.use('/aluno',rotaAluno)
app.use('/equipeEducacional', rotaEquipeEducacional)
app.use('/cargos',rotaCargos)

//define um procedimento que sera chamado as 8 da manha
cron.schedule('0 2 * * *', enviarNotificacao3dias)
cron.schedule('0 1 * * *', enviarNotificacao1dia)
cron.schedule('0 0 * * *', enviarNotificacaoDodia)




app.listen(port, ()=>{
    console.log(`Servidor rodando em http://localhost:${port}!`)
    console.log(`Ver rotas em http://localhost:${port}/api-docs`)
})
