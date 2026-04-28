import mongoose from "mongoose";
import AdoptionsRepository from "../repositories/adoptions.repository.js";
import UsersRepository from "../repositories/users.repository.js";
import PetsRepository from "../repositories/pets.repository.js";
import ValidationError from "../utils/errors/ValidationError.js";
import NotFoundError from "../utils/errors/NotFoundError.js";

class AdoptionsService {
  constructor(adoptionRepository = new AdoptionsRepository(), userRepository = new UsersRepository(), petRepository = new PetRepository()){
    this.adoptionRepository = adoptionRepository;
    this.userRepository = userRepository;
    this.petRepository = petRepository;
  }

  async getAllAdoptions(){
    return await this.adoptionRepository.getAllAdoptions();
  }

  async getAdoptionById(adoptionId){
    if(!adoptionId) throw new ValidationError('Adoption ID is required');

    const adoption = await this.adoptionRepository.getAdoptionById(adoptionId);
    if(!adoption) throw new NotFoundError('Adoption not found');

    return adoption;
  }

  async createAdoption(adoptionData){
    if(!adoptionData.owner) throw new ValidationError('Owner is required');
    if(!adoptionData.pet) throw new ValidationError('Pet is required');

    if(!mongoose.Types.ObjectId.isValid(adoptionData.owner)) throw new ValidationError('Invalid owner ID');
    if(!mongoose.Types.ObjectId.isValid(adoptionData.pet)) throw new ValidationError('Invalid pet ID');

    const user = await this.userRepository.getUserById(adoptionData.owner);
    if(!user) throw new NotFoundError('User not found');

    const pet = await this.petRepository.getPetById(adoptionData.pet);
    if(!pet) throw new NotFoundError('Pet not found');

    if(pet.adopted) throw new ValidationError('Pet is already adopted');

    const createdAdoption = await this.adoptionRepository.createAdoption(adoptionData);
    
    await this.petRepository.updatePet(adoptionData.pet, { adopted: true, owner: adoptionData.owner });
    await this.userRepository.updateUser(adoptionData.owner, { pets: [...user.pets, adoptionData.pet] });

    return createdAdoption;
  }

  async deleteAdoption(adoptionId){
    if(!adoptionId) throw new ValidationError('Adoption ID is required');

    const deletedAdoption = await this.adoptionRepository.deleteAdoption(adoptionId);
    return deletedAdoption;
  }
}

export default AdoptionsRepository;