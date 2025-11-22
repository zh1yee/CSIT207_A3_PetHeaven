const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// Controllers
const GetPetsController = require("./controller/GetPetsController");
const LoginController = require("./controller/LoginController");
const CreateUserController = require("./controller/CreateUserController");
const CreateAdoptionController = require("./controller/CreateAdoptionController");
const CreateSurrenderController = require("./controller/CreateSurrenderController");

class Server {
  constructor() {
    this.app = express();
    this.HOST = "0.0.0.0";
    this.PORT = process.env.PORT || 3001;
    this.setupMiddleware();
    this.setupRoutes();
  }

    setupMiddleware() {
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json(/*{limit: "50mb"}*/ ));
    }

    setupRoutes() {
        this.app.get("/api/pets/view", GetPetsController.getPets.bind(GetPetsController));
        this.app.post("/api/user/login", LoginController.loginUser.bind(LoginController));
        this.app.post("/api/user/create", CreateUserController.createUser.bind(CreateUserController));
        this.app.post("/api/adoption/create", CreateAdoptionController.createAdoption.bind(CreateAdoptionController));
        this.app.post("/api/surrender/create", CreateSurrenderController.createSurrender.bind(CreateSurrenderController));
        
        // Error handling middleware
        this.app.use((err, req, res, next) => {
            console.error("Error:", err);
            res.status(500).json({ error: err.message || "Internal server error" });
        });
    }

    start() {
    this.app.listen(this.PORT, this.HOST, () => {
      console.log(`Server is running on http://${this.HOST}:${this.PORT}`);
    });
  }
}


const server = new Server();
server.start();
