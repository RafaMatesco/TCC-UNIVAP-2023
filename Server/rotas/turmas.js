const express = require("express")

const router = express.Router()

const {getTurmasProf,getRelacoes, postTurmasXprof,deleteTurmasXprof, getTurmaAluno, postTurmas, getTurmas, putTurmas, deleteTurmas, getAllAlunos}= require("../controladores/turmas")

/**
 * @swagger
 * /turmas/prof:
 *   get:
 *     summary: 
 *      - pega turmas relacionadas a um professor
 *     parameters:
 *      - name: registro
 *        in: query
 *        description: id do professor
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
 *                 nomeTurma:
 *                   type: string
 *                 IDturma:
 *                   type: integer 
 *       400:
 *         description: Erro
 */
router.get('/prof',getTurmasProf)

/**
 * @swagger
 * /turmas/aluno:
 *   get:
 *     summary: 
 *      - pega turma de um aluno
 *     parameters:
 *      - name: registro
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
 *                 nomeTurma:
 *                   type: string
 *                 IDturma:
 *                   type: integer 
 *       400:
 *         description: Erro
 */
router.get('/aluno', getTurmaAluno)
/**
 * @swagger
 * /turmas/AllAlunos:
 *   get:
 *     summary:
 *      - pega todos os alunos de uma turma
 *     parameters:
 *      - name: IDturma
 *        in: query
 *        description: id da turma
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
 *                 nomeTurma:
 *                   type: string
 *                 IDturma:
 *                   type: integer
 *       400:
 *         description: Erro
 */
router.get('/AllAlunos', getAllAlunos)


/**
 * @swagger
 * /turmas/turmasXprof:
 *   post:
 *     summary: 
 *      - cria relação entre turma e professor
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               registro:
 *                 type: integer
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
router.post('/turmasXprof',postTurmasXprof)

/**
 * @swagger
 * /turmas/turmasXprof:
 *   delete:
 *     summary: 
 *      - exclui relação entre turma e professor
 *     parameters:
 *      - name: IDrelacao
 *        in: query
 *        description: id da relação prfessor com turma
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
router.delete('/turmasXprof',deleteTurmasXprof)

/**
 * @swagger
 * /turmas:
 *   post:
 *     summary: 
 *      - cria turma
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IDturma:
 *                 type: integer
 *               turma:
 *                 type: string 
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           string:
 *             schema:
 *                 resp:
 *                  type: string
 *       409:
 *          description: ID ja cadastrado
 *       400:
 *         description: Erro
 */
router.post('/',postTurmas)

/**
 * @swagger
 * /turmas:
 *   get:
 *     summary: 
 *      - pega todas as turmas
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nomeTurma:
 *                   type: string
 *                 IDturma:
 *                   type: integer 
 *       400:
 *         description: Erro
 */
router.get('/', getTurmas)

/**
 * @swagger
 * /turmas:
 *   put:
 *     summary: 
 *      - altera turma
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IDturma:
 *                 type: integer
 *               turma:
 *                 type: string 
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
router.put('/',putTurmas )

/**
 * @swagger
 * /turmas:
 *   delete:
 *     summary: 
 *      - exclui turma
 *     parameters:
 *      - name: IDturma
 *        in: query
 *        description: id da turma
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
router.delete('/',deleteTurmas)

/**
 * @swagger
 * /turmas/relacoes:
 *   get:
 *     summary: 
 *      - pega todas as relacoes de professores e turmas
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 IDrelacao:
 *                   type: integer
 *                 registro:
 *                   type: integer 
 *                 nomeadm:
 *                   type: string 
 *                 IDturma:
 *                   type: integer
 *                 nomeTurma:
 *                   type: string 
 * 
 *       400:
 *         description: Erro
 */
router.get('/relacoes',getRelacoes)

module.exports = router