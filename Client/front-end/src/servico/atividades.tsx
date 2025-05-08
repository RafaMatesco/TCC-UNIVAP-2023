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
async function deleteAtividade(ID:number) {
    const result =  await back_End.delete(`atividades?IDpostagem=${ID}`)
    return result
}

async function getAtividade(ID:string) {
    const result =  await back_End.get(`atividades?IDpostagem=${ID}`,)
    return result
}

async function putAtividade(body:any) {
    const result =  await back_End.put('atividades', body)
    return result
}

async function getAtividadesAluno(IDturma: number, matricula:string|null) {
    const result =  await back_End.get(`atividades/aluno?turma=${IDturma}&matricula=${matricula}`)
    return result
}
async function getAtividadesRealizasAluno(matricula: string) {
    const result =  await back_End.get(`atividades/realizadas?matricula=${matricula}`)
    return result
}
async function getAtividadesVencidasTurma(IDturma: number) {
    const result =  await back_End.get(`atividades/vencidas?IDturma=${IDturma}`)
    return result
}

async function postAtividadeRealizada(body: {
    IDatividade: number,
    matricula: number,
    texto: string,
    arquivo: string
  }) {
    const result =  await back_End.post(`atividades/marcarRealizada`,body)
    return result
}

async function getAtividadesArquivadas(registro:string) {
    const result =  await back_End.get(`atividades/prof/arquivadas?registro=${registro}`)
    return result
}

async function getAtividadesRealizasProf(IDatividade: string) {
    const result =  await back_End.get(`atividades/realizadas/prof?IDpostagem=${IDatividade}`)
    return result
}

export { deleteAtividade, getAtividade, getAtividadesAluno, getAtividadesArquivadas, getAtividadesProf, getAtividadesRealizasAluno, getAtividadesVencidasTurma, getAtividadesRealizasProf, postAtividade, postAtividadeRealizada, putAtividade }

