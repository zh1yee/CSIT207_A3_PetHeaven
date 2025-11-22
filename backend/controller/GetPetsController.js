const BaseController = require("./BaseController");
const PetsEntity = require("../entity/PetsEntity");

class GetPetsController extends BaseController {
  constructor() {
    super();
  }

    async getPets(req, res, next) {
        const { id } = req.query;
        const petsEntity = new PetsEntity();
        try {
            const pets = await petsEntity.getPets(id);
            res.json(pets);
        } catch (error) {
            next(error);
        }
    }
}


/*
class GetPetsController extends BaseController {
  constructor() {
    super();
    this.userEntity = new UserEntity();
    this.router.get("/pets", this.getPets.bind(this));
  }

  async getPets(req, res) {
    try {
      const users = await this.userEntity.getPets();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch pets" });
    }
  }
}
*/

module.exports = new GetPetsController();