import PetsService from "../services/pets.service.js";

class PetsController {
  constructor(petService = new PetsService()){
    this.petService = petService;
  }

  // GET /api/pets
  getAllPets = async (req, res, next) => {
    try {
      const pets = await this.petService.getAllPets();

      res.status(200).json({ status: 'success', message: 'Pets obtained successfully', payload: pets });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/pets/:pid
  getPetById = async (req, res, next) => {
    try {
      const { pid: petId } = req.params;

      const pet = await this.petService.getPetById(petId);

      res.status(200).json({ status: 'success', message: 'Pet obtained successfully', payload: pet });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/pets/specie/:specie
  getPetsBySpecie = async (req, res, next) => {
    try {
      const { specie } = req.params;

      const pets = await this.petService.getPetsBySpecie(specie);

      res.status(200).json({ status: 'success', message: 'Pets retrieved by species successfully', payload: pets });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/pets
  createPet = async (req, res, next) => {
    try {
      const petData = req.body;

      const createdPet = await this.petService.createPet(petData);

      res.status(201).json({ status: 'success', message: 'Pet created successfully', payload: createdPet });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/pets/:pid
  updatePet = async (req, res, next) => {
    try {
      const { pid: petId } = req.params;
      const updateData = req.body;

      const updatedPet = await this.petService.updatePet(petId, updateData);

      res.status(200).json({ status: 'success', message: 'Pet updated successfully', payload: updatedPet });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/pets/:pid
  deletePet = async (req, res, next) => {
    try {
      const { pid: petId } = req.params;

      const deletedPet = await this.petService.deletePet(petId);

      res.status(200).json({ status: 'success', message: 'Pet deleted successfully', payload: deletedPet });
    } catch (error) {
      next(error);
    }
  }
}

export default PetsController;