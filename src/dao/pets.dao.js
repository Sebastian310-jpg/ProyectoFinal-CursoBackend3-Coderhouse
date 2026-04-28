import PetModel from "../models/pet.model.js";

class PetsDao {
  async getAllPets(){
    return await PetModel.find();
  }

  async getPetById(petId){
    return await PetModel.findById(petId);
  }

  async getPetsBySpecie(specie){
    return await PetModel.find({ specie: new RegExp(`^${specie}$/`, 'i') });
  }

  async createPet(petData){
    return await PetModel.create(petData);
  }

  async updatePet(petId, updateData){
    return await PetModel.findByIdAndUpdate(petId, updateData, { returnDocument: 'after' });
  }

  async deletePet(petId){
    return await PetModel.findByIdAndDelete(petId);
  }
}

export default PetsDao;