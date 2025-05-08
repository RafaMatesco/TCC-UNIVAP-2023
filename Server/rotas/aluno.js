const express = require("express")
const router = express.Router()

const {getAluno,getAllAlunos, postAluno, putAluno, deleteAluno, postAlunos }= require("../controladores/aluno")
/**
 * @swagger
 * /aluno:
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
 *                 IDturma:
 *                   type: integer
 *                 nomeTurma:
 *                   type: string
 *       400:
 *         description: Erro
 */
router.get('/',getAluno)
/**
 * @swagger
 * /aluno/all:
 *   get:
 *     summary: 
 *      - pega todos os alunos
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
 *                 IDturma:
 *                   type: integer
 *       400:
 *         description: Erro
 */
router.get('/all',getAllAlunos)


/**
 * @swagger
 * /aluno:
 *   post:
 *     summary: 
 *      - cria um novo aluno
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matricula:
 *                 type: integer
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               IDturma:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           string:
 *             schema:
 *                 resp:
 *                  type: string
 *       400:
 *         description: Erro
 */
router.post('/',postAluno)

/**
 * @swagger
 * /aluno/all:
 *   post:
 *     summary: 
 *      - cria um novo aluno
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matricula:
 *                 type: integer
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               IDturma:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           string:
 *             schema:
 *                 resp:
 *                  type: string
 *       400:
 *         description: Erro
 */
router.post('/all',postAlunos)

/**
 * @swagger
 * /aluno:
 *   put:
 *     summary: 
 *      - altera um aluno
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matricula:
 *                 type: integer
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               IDturma:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           string:
 *             schema:
 *                 resp:
 *                  type: string
 *       400:
 *         description: Erro
 */
router.put('/',putAluno)
/**
 * @swagger
 * /aluno:
 *   delete:
 *     summary: 
 *      - exclui um aluno
 *     parameters:
 *      - name: matricula
 *        in: query
 *        description: matricula do alu o
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           string:
 *             schema:
 *                 resp:
 *                  type: string
 *       400:
 *         description: Erro
 */
router.delete('/', deleteAluno )

module.exports = router