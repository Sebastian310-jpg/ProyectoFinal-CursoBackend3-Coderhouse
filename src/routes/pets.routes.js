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