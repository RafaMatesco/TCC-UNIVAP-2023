const express = require("express")

const router = express.Router()

const {getAtividadesProf,getAtividadeProfArquivadas,getAtividade, postAtividades, getAtividadesAluno, putAtividades, deleteAtividades, postMarcarRealizada, getAtividadeRealizada }= require("../controladores/atividade")
/**
 * @swagger
 * /atividades:
 *   get:
 *     summary: 
 *      - pega uma atividade especifica
 *     parameters:
 *      - name: IDpostagem
 *        in: query
 *        description: id da atividade
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *       200:
 * 
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 IDpostagem:
 *                   type: integer
 *                 DataPostagem:
 *                   type: string  
 *                 Datavencimento:
 *                   type: string 
 *                 titulo:
 *                   type: string
 *                 texto:
 *                   type: string
 *                 caminhoArquivo:
 *                   type: string
 *                 IDturma:
 *                   type: integer
 *                 nomeTurma:
 *                   tyoe: string
 *       
 *       400:
 *         description: Erro
 */
router.get('/',getAtividade )

/**
 * @swagger
 * /atividades/prof:
 *   get:
 *     summary: 
 *      - pega as atividades de um professor
 *     parameters:
 *      - name: registro
 *        in: query
 *        description: id do professor
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *       200:
 * 
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 IDpostagem:
 *                   type: integer
 *                 DataPostagem:
 *                   type: string  
 *                 Datavencimento:
 *                   type: string 
 *                 titulo:
 *                   type: string
 *                 texto:
 *                   type: string
 *                 caminhoArquivo:
 *                   type: string
 *                 IDturma:
 *                   type: integer
 *                 nomeTurma:
 *                   tyoe: string
 *       
 *       400:
 *         description: Erro
 */
router.get('/prof',getAtividadesProf)
/**
 * @swagger
 * /atividades/prof/arquivadas:
 *   get:
 *     summary: 
 *      - pega as atividades arquivadas de um professor 
 *     parameters:
 *      - name: registro
 *        in: query
 *        description: id do professor
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *       200:
 * 
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 IDpostagem:
 *                   type: integer
 *                 DataPostagem:
 *                   type: string  
 *                 Datavencimento:
 *                   type: string 
 *                 titulo:
 *                   type: string
 *                 texto:
 *                   type: string
 *                 caminhoArquivo:
 *                   type: string
 *                 IDturma:
 *                   type: integer
 *                 nomeTurma:
 *                   tyoe: string
 *       
 *       400:
 *         description: Erro
 */
router.get('/prof/arquivadas',getAtividadeProfArquivadas )
/**
 * @swagger
 * /atividades/aluno:
 *   get:
 *     summary: 
 *      - pega as atividades de uma turma
 *     parameters:
 *      - name: turma
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
 *                 IDpostagem:
 *                   type: integer
 *                 tipoPostagem:
 *                   type: integer 
 *                 DataPostagem:
 *                   type: string  
 *                 Datavencimento:
 *                   type: string 
 *                 titulo:
 *                   type: string
 *                 texto:
 *                   type: string
 *                 caminhoArquivo:
 *                   type: string
 *                 nomeProf:
 *                   type: string
 *       
 *       400:
 *         description: Erro
 */
router.get('/aluno',getAtividadesAluno)

/**
 * @swagger
 * /atividades:
 *   post:
 *     summary: 
 *      - cria uma nova atividade
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipoPostagem:
 *                 type: integer
 *               titulo:
 *                 type: string
 *               texto:
 *                 type: string
 *               IDTurma:
 *                 type: integer
 *               dataPostagem:
 *                 type: string
 *               dataVencimento:
 *                 type: string
 *               arquivo:
 *                 type: string 
 *               arquivada:
 *                 type: boolean 
 *               registro:
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
router.post('/',postAtividades)
/**
 * @swagger
 * /atividades:
 *   put:
 *     summary: 
 *      - altera uma atividade
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IDpostagem: 
 *                 type: integer
 *               tipoPostagem:
 *                 type: integer
 *               titulo:
 *                 type: string
 *               texto:
 *                 type: string
 *               IDTurma:
 *                 type: integer
 *               dataPostagem:
 *                 type: string
 *               dataVencimento:
 *                 type: string
 *               arquivo:
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
router.put('/', putAtividades )
/**
 * @swagger
 * /atividades:
 *   delete:
 *     summary: 
 *      - exclui uma atividade
 *     parameters:
 *      - name: IDpostagem
 *        in: query
 *        description: id do professor
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
router.delete('/', deleteAtividades)

/**
 * @swagger
 * /atividades/marcarRealizada:
 *   post:
 *     summary: 
 *      - marca uma atividade como realizada
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IDatividade:
 *                 type: integer
 *               matricula:
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
router.post('/marcarRealizada', postMarcarRealizada )

/**
 * @swagger
 * /atividades/realizadas:
 *   get:
 *     summary: 
 *      - pega as atividades realizadas pelo aluno
 *     parameters:
 *      - name: matricula
 *        in: query
 *        description: id do aluno
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
 *                 IDpostagem:
 *                   type: integer
 *                 tipoPostagem:
 *                   type: integer 
 *                 DataPostagem:
 *                   type: string  
 *                 Datavencimento:
 *                   type: string 
 *                 titulo:
 *                   type: string
 *                 texto:
 *                   type: string
 *                 caminhoArquivo:
 *                   type: string
 *                 nomeProf:
 *                   type: string
 *       400:
 *         description: Erro
 */
router.get('/realizadas', getAtividadeRealizada )

module.exports = router


