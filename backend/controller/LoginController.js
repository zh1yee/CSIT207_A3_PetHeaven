const BaseController = require("./BaseController");
const UserEntity = require("../entity/UserEntity");

class LoginController extends BaseController {
  constructor() {
    super();
  }

    async loginUser(req, res, next) {
        try {
            const userEntity = new UserEntity();
            const { email, password } = req.body;
            const user = await userEntity.login(email, password);  
            if (!user) {
                return res.status(401).json({ error: "Invalid email or password" });
            }
            res.json({ message: "Login successful", user });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new LoginController();