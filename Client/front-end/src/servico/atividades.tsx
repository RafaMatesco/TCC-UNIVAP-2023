import axios from "axios"


const back_End = axios.create({baseURL:"http://localhost:8080/"})

async function getAtividadesProf(registro: string) {
    const result =  await back_End.get(`atividades/prof?registro=${registro}`)
    return result
}
async function postAtividade(body:any) {
    const result =  await back_End.post('atividades', body)
    return result
}

async function getAtividade(body:any) {
    const result =  await back_End.get('atividades', body)
    return result
}

async function putAtividade(body:any) {
    const result =  await back_End.put('atividades', body)
    return result
}

async function getAtividadesAluno(IDturma: number) {
    const result =  await back_End.get(`atividades/aluno?turma=${IDturma}`)
    return result
}
async function getAtividadesRealizasAluno(matricula: string) {
    const result =  await back_End.get(`atividades/realizadas?matricula=${matricula}`)
    return result
}

async function postAtividadeRealizada(body: {
    IDatividade: number,
    matricula: number
  }) {
    const result =  await back_End.post(`atividades/marcarRealizada`,body)
    return result
}

async function getAtividadesArquivadas(registro:string) {
    const result =  await back_End.get(`atividades/prof/arquivadas?registro=${registro}`)
    return result
}
export{
    getAtividadesProf, 
    getAtividadesAluno,
    postAtividade,
    getAtividade,
    putAtividade,
    getAtividadesRealizasAluno,
    postAtividadeRealizada,
    getAtividadesArquivadas
}

