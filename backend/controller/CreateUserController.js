const BaseController = require("./BaseController");
const UserEntity = require("../entity/UserEntity");

class CreateUserController extends BaseController {
  constructor() {
    super();
  }

  async createUser(req, res, next) {
    try {
      const userData = req.body;
      
      const userEntity = new UserEntity();
      const newUser = await userEntity.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
        if (error.code === "P2002") {
        return res.status(400).json({ error: `User already exists` });
      }
      next(error);
    }
  }
}

module.exports = new CreateUserController();