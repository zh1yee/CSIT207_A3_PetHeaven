const express = require("express");

class BaseController {
  constructor() {
    this.router = express.Router();
    this.prisma = require("../prismaInstance");
  }
}

module.exports = BaseController;