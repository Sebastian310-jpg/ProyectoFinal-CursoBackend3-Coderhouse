import PetsRepository from "../repositories/pets.repository.js";
import NotFoundError from "../utils/errors/NotFoundError.js";
import ValidationError from "../utils/errors/ValidationError.js";

class PetsService {
  constructor(petRepository = new PetsRepository()){
    this.petRepository = petRepository;
  }

  async getAllPets(){
    return await this.petRepository.getAllPets();
  }

  async getPetById(petId){
    if(!petId) throw new ValidationError('Pet ID is required');

    const pet = await this.petRepository.getPetById(petId);
    if(!pet) throw new NotFoundError('Pet not found');

    return pet;
  }

  async getPetsBySpecie(specie){
    if(!specie) throw new ValidationError('Specie is required');

    const pets = await this.petRepository.getPetsBySpecie(specie);
    return pets;
  }

  async createPet(petData){
    if(!petData.specie) throw new ValidationError('Specie is required');

    const createdPet = await this.petRepository.createPet(petData);
    return createdPet;
  }

  async updatePet(petId, updateData){
    if(!petId) throw new ValidationError('Pet ID is required');

    const updatedPet = await this.petRepository.updatePet(petId, updateData);
    return updatedPet;
  }

  async deletePet(petId){
    if(!petId) throw new ValidationError('Pet ID is required');

    const deletedPet = await this.petRepository.deletePet(petId);
    return deletedPet;
  }
}

export default PetsService;