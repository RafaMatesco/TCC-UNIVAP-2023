import axios from "axios"


const back_End = axios.create({baseURL:"http://localhost:8080/"})


async function getEquipeEducacional() {
    const result = back_End.get(`equipeEducacional`)
    return result
}

export{
    getEquipeEducacional
}