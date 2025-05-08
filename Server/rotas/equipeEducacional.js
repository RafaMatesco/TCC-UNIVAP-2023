const express = require("express")
const router = express.Router()


const {getEquipeEducacional , updateMesagemNotificacao, getMensagemNotificacao, postEquipeEducacional, getProfessor, putSenha}  = require("../controladores/equipeEducacional")


/**
 * @swagger
 * /equipeEducacional:
 *   post:
 *     summary:
 *      - cadastra um professor
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               registro:
 *                 type: integer
 *               nome:
 *                 type: string
 *               senha:
 *                 type: string
 *               IDcargo:
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
router.post('/', postEquipeEducacional)
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
/**
 * @swagger
 * /equipeEducacional/mesagemNotificacao:
 *   put:
 *     summary:
 *      - altera a notificacao de um professor
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               registro:
 *                 type: integer
 *               texto:
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

router.put('/mesagemNotificacao', updateMesagemNotificacao)

/**
 * @swagger
 * /equipeEducacional/mesagemNotificacao:
 *   get:
 *     summary:
 *      - pega a mensagm de notificacao de um professor
 *     parameters:
 *      - name: registro
 *        in: query
 *        description: registro do professor
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

router.get('/mesagemNotificacao', getMensagemNotificacao)

/**
 * @swagger
 * /equipeEducacional/professor:
 *   get:
 *     summary:
 *      - pega um professor
 *     parameters:
 *      - name: registro
 *        in: query
 *        description: registro do professor
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
 *                 caminhoFoto:
 *                   type: string
 *                 IDturma:
 *                   type: integer
 *                 nomeTurma:
 *                   type: string
 *       400:
 *         description: Erro
 */
router.get('/professor', getProfessor)


/**
 * @swagger
 * /equipeEducacional/professor/senha:
 *   put:
 *     summary:
 *      - altera a senha de um professor
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               registro:
 *                 type: integer
 *               senha:
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
router.put('/professor/senha', putSenha)

module.exports =  router