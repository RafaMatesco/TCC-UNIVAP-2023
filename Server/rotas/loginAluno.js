const express = require("express")
const con= require("../conexao/banco")
const router = express.Router()

const {loginAluno }= require("../controladores/loginAluno")

/**
 * @swagger
 * /loginAluno:
 *   get:
 *     summary: 
 *      - pega aluno especifico
 *     parameters:
 *      - name: matricula
 *        in: query
 *        description: matricula do aluno
 *        required: true
 *        schema:
 *          type: integer
 *      - name: senha
 *        in: query
 *        description: senha do aluno
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           string:
 *             schema:
 *                 resp:
 *                  type: string
 *       
 *       400:
 *         description: Erro
 */
router.get('/',loginAluno)

module.exports = router