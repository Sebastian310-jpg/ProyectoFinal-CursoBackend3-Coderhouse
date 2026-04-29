/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Obtener todas las adopciones
 *     tags:
 *       - Adoptions
 *     responses:
 *       200:
 *         description: Lista de adopciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Adoption'
 *
 *   post:
 *     summary: Crear una nueva adopción
 *     tags:
 *       - Adoptions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdoptionInput'
 *     responses:
 *       201:
 *         description: Adopción creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Adoption'
 *
 * /api/adoptions/{aid}:
 *   get:
 *     summary: Obtener una adopción por ID
 *     tags:
 *       - Adoptions
 *     parameters:
 *       - name: aid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la adopción
 *     responses:
 *       200:
 *         description: Adopción encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Adoption'
 *       404:
 *         description: Adopción no encontrada
 *
 *   delete:
 *     summary: Eliminar una adopción
 *     tags:
 *       - Adoptions
 *     parameters:
 *       - name: aid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la adopción
 *     responses:
 *       200:
 *         description: Adopción eliminada correctamente
 *       404:
 *         description: Adopción no encontrada
 */

import express from "express";
import AdoptionsController from "../controllers/adoptions.controller.js";

const adoptionsRouter = express.Router();
const adoptionController = new AdoptionsController();

adoptionsRouter.get('/', adoptionController.getAllAdoptions);
adoptionsRouter.get('/:aid', adoptionController.getAdoptionById);
adoptionsRouter.post('/', adoptionController.createAdoption);
adoptionsRouter.delete('/:aid', adoptionController.deleteAdoption);

export default adoptionsRouter;