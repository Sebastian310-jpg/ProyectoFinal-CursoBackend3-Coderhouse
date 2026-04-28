import express from "express";
import AdoptionsController from "../controllers/adoptions.controller.js";

const adoptionsRouter = express.Router();
const adoptionController = new AdoptionsController();

adoptionsRouter.get('/', adoptionController.getAllAdoptions);
adoptionsRouter.get('/:aid', adoptionController.getAdoptionById);
adoptionsRouter.post('/', adoptionController.createAdoption);
adoptionsRouter.delete('/:aid', adoptionController.deleteAdoption);

export default adoptionsRouter;