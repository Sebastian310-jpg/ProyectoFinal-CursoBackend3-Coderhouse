import AdoptionsDao from '../dao/adoptions.dao.js';

class AdoptionsRepository {
  constructor(adoptionDao = new AdoptionsDao()) {
    this.adoptionDao = adoptionDao;
  }

  async getAllAdoptions() {
    return await this.adoptionDao.getAllAdoptions();
  }

  async getAdoptionById(adoptionId) {
    return await this.adoptionDao.getAdoptionById(adoptionId);
  }

  async createAdoption(adoptionData) {
    return await this.adoptionDao.createAdoption(adoptionData);
  }

  async deleteAdoption(adoptionId) {
    return await this.adoptionDao.deleteAdoption(adoptionId);
  }
}

export default AdoptionsRepository;