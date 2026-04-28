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