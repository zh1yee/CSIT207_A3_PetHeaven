// This file is used to create a single instance of prisma client to prevent circular dependencies

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
module.exports = prisma;
