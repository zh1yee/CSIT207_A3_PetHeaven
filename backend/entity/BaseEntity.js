const { PrismaClient } = require("@prisma/client");

class BaseEntity {
  constructor() {
    this.prisma = new PrismaClient();
  }
}

module.exports = BaseEntity;