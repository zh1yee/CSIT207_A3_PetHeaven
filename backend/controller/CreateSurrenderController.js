const BaseController = require("./BaseController");
const SurrenderEntity = require("../entity/SurrenderEntity");

class CreateSurrenderController extends BaseController {
  constructor() {
    super();
  }

    async createSurrender(req, res, next) {
        try {
            const surrenderData = req.body;
            const surrenderEntity = new SurrenderEntity();
            const newSurrender = await surrenderEntity.createSurrender(surrenderData);
            res.status(201).json(newSurrender);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CreateSurrenderController();