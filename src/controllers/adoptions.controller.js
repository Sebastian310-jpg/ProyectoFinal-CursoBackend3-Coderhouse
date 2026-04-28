import AdoptionsService from "../services/adoptions.service.js";

class AdoptionsController {
  constructor(adoptionService = new AdoptionsService()){
    this.adoptionService = adoptionService;
  }

  // GET /api/adoptions
  getAllAdoptions = async (req, res, next) => {
    try {
      const adoptions = await this.adoptionService.getAllAdoptions();

      res.status(200).json({ status: 'success', message: 'Adoptions obtained successfully', payload: adoptions });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/adoptions/:aid
  getAdoptionById = async (req, res, next) => {
    try {
      const { aid: adoptionId } = req.params;

      const adoption = await this.adoptionService.getAdoptionById(adoptionId);

      res.status(200).json({ status: 'success', message: 'Adoption obtained successfully', payload: adoption });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/adoptions
  createAdoption = async (req, res, next) => {
    try {
      const adoptionData = req.body;

      const createdAdoption = await this.adoptionService.createAdoption(adoptionData);

      res.status(201).json({ status: 'success', message: 'Adoption created successfully', payload: createdAdoption });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/adoptions/:aid
  deleteAdoption = async (req, res, next) => {
    try {
      const { aid: adoptionId } = req.params;

      const deletedAdoption = await this.adoptionService.deleteAdoption(adoptionId);

      res.status(200).json({ status: 'success', message: 'Adoption deleted successfully', payload: deletedAdoption });
    } catch (error) {
      next(error);
    }
  }
}

export default AdoptionsController;