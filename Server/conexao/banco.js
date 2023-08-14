const bd = require('mysql2')

const con = bd.createConnection({
    host: "tcc.c4fsrgel8mzi.sa-east-1.rds.amazonaws.com",
    user: "root",
    password: "PauloRenato",
    database: "quadro_avisos_univap"
})

module.exports = con
