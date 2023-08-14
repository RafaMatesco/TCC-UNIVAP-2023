import axios from "axios"


const back_End = axios.create({baseURL:"http://localhost:8080/"})

async function getAluno(IDaluno: string) {
    const result = await new Promise((resolve, reject) => {
        back_End.get(`aluno?matricula=${IDaluno}`)
        .then(function(response){
            resolve(response.data)
        }).catch(function(error){
            reject( error)
        })
    });
    return result
}
async function getAllAlunos() {
    const result = await new Promise((resolve, reject) => {
        back_End.get(`aluno/all`)
        .then(function(response){
            resolve(response.data)
        }).catch(function(error){
            reject( error)
        })
    });
    return result
}


async function postAluno(body:{ matricula: number, nome: string, email: string, senha: string, IDturma: number}) {
    return await back_End.post(`aluno`,body)
    
}


export{
    getAluno,
    getAllAlunos,
    postAluno
}
