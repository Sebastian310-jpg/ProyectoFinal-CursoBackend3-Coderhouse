import PetsDao from '../dao/pets.dao.js';

class PetsRepository {
  constructor(petDao = new PetsDao()) {
    this.petDao = petDao;
  }

  async getAllPets() {
    return await this.petDao.getAllPets();
  }

  async getPetById(petId) {
    return await this.petDao.getPetById(petId);
  }

  async getPetsBySpecie(specie){
    return await this.petDao.getPetsBySpecie(specie);
  }

  async createPet(petData) {
    return await this.petDao.createPet(petData);
  }

  async updatePet(petId, updateData) {
    return await this.petDao.updatePet(petId, updateData);
  }

  async deletePet(petId) {
    return await this.petDao.deletePet(petId);
  }
}

export default PetsRepository;