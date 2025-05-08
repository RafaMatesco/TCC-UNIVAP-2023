const multer = require("multer")
const path = require("path")
const crypto = require("crypto")
const { lutimes } = require("fs")


module.exports = {
    dest: path.resolve(__dirname, '..', 'tmp', 'uploads'),
    storage: multer.diskStorage({
        destination:path.resolve(__dirname, '..', 'tmp', 'uploads'),
        filename:(req,file,cb)=>{
            crypto.randomBytes(16, (err, hash)=>{
                if(err) cb(err)
                const fileName  = `${hash.toString("hex")}-${file.originalname}`
                cb(null, fileName)
            })
        }
    })
}