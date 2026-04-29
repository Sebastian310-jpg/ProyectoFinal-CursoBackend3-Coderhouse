/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Obtener todas las mascotas
 *     tags:
 *       - Pets
 *     responses:
 *       200:
 *         description: Lista de mascotas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 *
 *   post:
 *     summary: Crear una nueva mascota
 *     tags:
 *       - Pets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PetInput'
 *     responses:
 *       201:
 *         description: Mascota creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *
 * /api/pets/specie/{specie}:
 *   get:
 *     summary: Obtener mascotas por especie
 *     tags:
 *       - Pets
 *     parameters:
 *       - name: specie
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Especie de la mascota
 *     responses:
 *       200:
 *         description: Lista de mascotas encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 *       404:
 *         description: No se encontraron mascotas
 *
 * /api/pets/{pid}:
 *   get:
 *     summary: Obtener una mascota por ID
 *     tags:
 *       - Pets
 *     parameters:
 *       - name: pid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mascota
 *     responses:
 *       200:
 *         description: Mascota encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       404:
 *         description: Mascota no encontrada
 *
 *   put:
 *     summary: Actualizar una mascota
 *     tags:
 *       - Pets
 *     parameters:
 *       - name: pid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mascota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PetInput'
 *     responses:
 *       200:
 *         description: Mascota actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       404:
 *         description: Mascota no encontrada
 *
 *   delete:
 *     summary: Eliminar una mascota
 *     tags:
 *       - Pets
 *     parameters:
 *       - name: pid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mascota
 *     responses:
 *       200:
 *         description: Mascota eliminada correctamente
 *       404:
 *         description: Mascota no encontrada
 */

import express from "express";
import PetsController from "../controllers/pets.controller.js";

const petsRouter = express.Router();
const petController = new PetsController();

petsRouter.get('/', petController.getAllPets);
petsRouter.get('/specie/:specie', petController.getPetsBySpecie);
petsRouter.get('/:pid', petController.getPetById);
petsRouter.post('/', petController.createPet);
petsRouter.put('/:pid', petController.updatePet);
petsRouter.delete('/:pid', petController.deletePet);

export default petsRouter;