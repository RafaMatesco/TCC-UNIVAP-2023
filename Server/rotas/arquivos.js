const express = require("express")
const Multer = require("multer")
const path = require("path")
const multerConfgs = require("../configs/multerConfigs")

const router = express.Router()
const multer = Multer(multerConfgs)

const {postFile, getFile} =  require("../controladores/arquivos")

router.post('/',multer.single('file'),postFile)
router.get('/', getFile)

module.exports = router 