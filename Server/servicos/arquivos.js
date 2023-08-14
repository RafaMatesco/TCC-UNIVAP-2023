const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3")
const { s3Client } = require("../conexao/bucket")
const fs = require("fs")
const path = require("path")



async function uploadFile(body){
  try{
    await s3Client.send(new PutObjectCommand(body));
    return(true)
  }catch (err) {
    console.log(err)
    return(err)
  }
}


async function downloadFile(body){
  try {
    const { Body } = await s3Client.send(new GetObjectCommand(body));
    const fileStream = fs.createWriteStream( path.resolve(__dirname, '..', 'tmp', 'downloads')+"//"+body.Key);
    await new Promise((resolve, reject) => {
      Body.pipe(fileStream)
        .on('error', reject)
        .on('close', resolve);
    });

    return body.Key
  } catch (err) {
    return false
  }
}




module.exports = {
    uploadFile,
    downloadFile
}