import axios from "axios"


const back_End = axios.create({baseURL:"http://localhost:8080/"})

async function getTurmasFromProf(registro: string) {
    const result = back_End.get(`/turmas/prof?registro=${registro}`)
    return result
}
async function getTurmaAluno(registro: string) {
    const result = back_End.get(`turmas/aluno?registro=${registro}`)
    return result
}
async function getAllTurmas() {
    const result =  await back_End.get(`turmas`)
    return result
}
async function getRelacoes() {
    const result =  await back_End.get(`turmas/relacoes`)
    return result
}

async function postRelacao(body: {
    "registro": number,
    "IDturma": number
  }) {
    
    const result =  await back_End.post('turmas/turmasXprof', body)    
    return result
}

async function deleteRelacao(ID:number) {
    
    const result =  await back_End.delete(`turmas/turmasXprof?IDrelacao=${ID}`)    
    return result
}

async function postTurma(body: {
    "IDturma": number,
    "turma": string
  }) {
    let result: any
    try{
        result =  await back_End.post('turmas', body)
    }catch(erro:any){
        if(erro.response.status === 409){
            result = 409
        }
    }
    
    return result
}

async function putTurma(body: {
    "IDturma": number,
    "turma": string
  }) {
    let result: any
    try{
        result =  await back_End.put('turmas', body)
    }catch(erro:any){

    }
    
    return result
}
async function deleteTurma(IDturma:number) {
    let result
    try{
        result =  await back_End.delete(`turmas?IDturma=${IDturma}`)
    }catch(error: any ){
        if(error.response.status === 409){
            result = 409
        }
    }
    
    
    return result
}





export{
    getTurmasFromProf,
    getTurmaAluno,
    getAllTurmas,
    postTurma,
    putTurma,
    deleteTurma,
    getRelacoes,
    postRelacao,
    deleteRelacao
}

