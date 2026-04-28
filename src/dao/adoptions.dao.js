import AdoptionModel from "../models/adoption.model.js";

class AdoptionsDao {
  async getAllAdoptions(){
    return await AdoptionModel.find().populate('owner').populate('pet');
  }

  async getAdoptionById(adoptionId){
    return await AdoptionModel.findById(adoptionId).populate('owner').populate('pet');
  }

  async createAdoption(adoptionData){
    return await AdoptionModel.create(adoptionData);
  }

  async deleteAdoption(adoptionId){
    return await AdoptionModel.findByIdAndDelete(adoptionId);
  }
}

export default AdoptionsDao;