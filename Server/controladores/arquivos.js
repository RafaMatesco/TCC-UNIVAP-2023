const{uploadFile, downloadFile} = require("../servicos/arquivos")
const fs = require("fs")
const path = require("path")
const con = require("../conexao/banco")
const { send } = require("process")

async function postFile(rec,res){                                             
    try{
        const caminho = path.resolve(__dirname, '..', 'tmp', 'uploads')+"/"+rec.file.filename
        const file = fs.readFileSync(caminho)
        const body = {
            Bucket: 'quadro.de.avisos',
            Key: rec.file.filename,
            Body: file
        }
        fs.unlinkSync(caminho)
        const resp = await uploadFile(body)
        if(resp){
            res.send(body.Key)
        }else{
            res.send("false")
        }
        
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}

async function getFile(rec,res){                                             
    try{
        
        const body = {
            Bucket: 'quadro.de.avisos',
            Key: rec.query.arquivo,
          };

        const resp = await downloadFile(body) 
        const caminho = path.resolve(__dirname, '..', 'tmp', 'downloads')+"//"+resp
        res.download(caminho)
        
    }catch(error)
    {
        res.status(500)
        res.send(error.message)
    }
}




module.exports = {
    postFile,
    getFile
}