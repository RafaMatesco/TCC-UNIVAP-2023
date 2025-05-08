import axios from "axios"


const back_End = axios.create({baseURL:"http://localhost:8080/"})


async function getEquipeEducacional() {
    const result = back_End.get(`equipeEducacional`)
    return result
}
async function getProfessor(ID:string) {
    const result = back_End.get(`equipeEducacional/professor?registro=${ID}`)
    return result
}
async function getMesagemNotificacao(ID:string) {
    const result = back_End.get(`equipeEducacional/mesagemNotificacao?registro=${ID}`)
    return result
}
async function postEquipeEducacional(body:{
    registro: number,
    nome: string,
    senha: string,
    IDcargo: number
  }) {
    let result
    try{
        
        result = await back_End.post(`equipeEducacional`, body)

    }catch(erro:any){
        console.log(erro.response.status+"jkdnjkcnbdjksbnckmds")
        if(erro.response.status === 409){
            result = 409
        }
    }
    console.log(result)
    return result
}
  


async function putMesagemNotificacao(body:{
    registro: string,
    texto: string
  }) {
    const result = back_End.put(`equipeEducacional/mesagemNotificacao`, body)
    return result
}

async function putSenha(body:{
    registro: string,
    senha: string
  }) {
    const result = back_End.put(`equipeEducacional/professor/senha`, body)
    return result
}


export {
    getEquipeEducacional, getMesagemNotificacao, getProfessor, postEquipeEducacional, putMesagemNotificacao, putSenha
}

