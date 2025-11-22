const BaseController = require("./BaseController");
const AdoptionEntity = require("../entity/AdoptionEntity");

class CreateAdoptionController extends BaseController { 
    constructor() {
        super();
    }
    
    async createAdoption(req, res, next) {
        try {
            const adoptionData = req.body;
            const adoptionEntity = new AdoptionEntity();
            const newAdoption = await adoptionEntity.createAdoption(adoptionData);
            res.status(201).json(newAdoption);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CreateAdoptionController();