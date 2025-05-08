const express = require("express")
const { getCargos } = require("../controladores/cargo")
const router = express.Router()
/**
 * @swagger
 * /cargos:
 *   get:
 *     summary:
 *      - pega todos os cargos
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 IDcargo:
 *                   type: integer
 *                 nomecargo:
 *                   type: string
 *       400:
 *         description: Erro
 */
router.get('/', getCargos)
module.exports =  router