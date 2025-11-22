const BaseEntity = require("./BaseEntity");

class PetsEntity extends BaseEntity {
  constructor() {
    super();
  }

  async getPets(id=null) {
    id ? parseInt(id) : null;
    return this.prisma.pets.findMany({
        where: id ? { id: id } : {},
    });
  }
}

module.exports = PetsEntity;