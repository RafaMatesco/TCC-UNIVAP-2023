import axios from "axios";


const back_End = axios.create({baseURL:"http://localhost:8080/"})

async function getCargo() {
    const result = await new Promise((resolve, reject) => {
        back_End.get(`/cargos`)
        .then(function(response){
            resolve(response.data)
        }).catch(function(error){
            reject( error)
        })
    });
    return result
}



export {
    getCargo
};
