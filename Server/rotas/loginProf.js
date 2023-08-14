const express = require("express")

const router = express.Router()

const {loginProf} = require("../controladores/loginProf")



/**
 * @swagger
 * /loginProf:
 *   get:
 *     summary: 
 *      - pega aluno especifico
 *     parameters:
 *      - name: id
 *        in: query
 *        description: id do professor
 *        required: true
 *        schema:
 *          type: integer
 *      - name: senha
 *        in: query
 *        description: senha do professor
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 permicao:
 *                   type: boolean
 *                 cargo:
 *                   type: integer 
 *               
 *       
 *       400:
 *         description: Erro
 */
router.get("/",loginProf)

module.exports = router