import axios from "axios"


const back_End = axios.create({baseURL:"http://localhost:8080/"})
async function postArquivo(arquivo: File) {
    const data = new FormData()
    data.append('file', arquivo)
    const result = await back_End.post('arquivos', data)
    console.log(result)
    return result.data
}

export{
    postArquivo
}
