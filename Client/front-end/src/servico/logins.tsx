import axios from "axios"


const back_End = axios.create({baseURL:"http://localhost:8080/"})

async function getLoginProf(body:{
    registro: string;
    senha: string;
}) {
    const result = await new Promise((resolve, reject) => {
        back_End.get(`/loginProf?id=${body.registro}&senha=${body.senha}`)
        .then(function(response){
            resolve(response.data)
        }).catch(function(error){
            reject( error)
        })
    });
    return result
}
async function getLoginAluno(body:{
    registro: string;
    senha: string;
}) {
    console.log(body)
    const result = await new Promise((resolve, reject) => {
        back_End.get(`/loginAluno?matricula=${body.registro}&senha=${body.senha}`)
        .then(function(response){
            resolve(response.data)
        }).catch(function(error){
            reject( error)
        })
    });
    console.log(result)
    return result
}

export{
    getLoginProf,
    getLoginAluno
}

