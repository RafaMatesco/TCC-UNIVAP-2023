const express = require("express")
const router = express.Router()


const {getEquipeEducacional}  = require("../controladores/equipeEducacional")


/**
 * @swagger
 * /equipeEducacional:
 *   get:
 *     summary: 
 *      - pega toda a equipe educacional
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 IDaluno:
 *                   type: integer
 *                 nome:
 *                   type: string 
 *                 email:
 *                   type: string  
 *                 senha:
 *                   type: string 
 *                 caminhoFoto:
 *                   type: string
 *                 IDturma:
 *                   type: integer
 *                 nomeTurma:
 *                   type: string
 *       400:
 *         description: Erro
 */
router.get('/', getEquipeEducacional)

module.exports =  router