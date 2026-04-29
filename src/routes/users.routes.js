/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *
 * /api/users/{uid}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *
 *   put:
 *     summary: Actualizar un usuario
 *     tags:
 *       - Users
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *
 *   delete:
 *     summary: Eliminar un usuario
 *     tags:
 *       - Users
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 */

import express from "express";
import UsersController from "../controllers/users.controller.js";

const usersRouter = express.Router();
const userController = new UsersController();

usersRouter.get('/', userController.getAllUsers);
usersRouter.get('/:uid', userController.getUserById);
usersRouter.post('/', userController.createUser);
usersRouter.put('/:uid', userController.updateUser);
usersRouter.delete('/:uid', userController.deleteUser);

export default usersRouter;