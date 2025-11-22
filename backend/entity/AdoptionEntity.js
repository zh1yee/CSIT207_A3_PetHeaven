const BaseEntity = require("./BaseEntity");

class AdoptionEntity extends BaseEntity {
  constructor() {
    super();
  }

    async createAdoption({
        id = undefined,
        fullName,
        email,
        phone,
        address,
        zipCode,
        housingType,
        ownOrRent,
        landlordApproval = null,
        hasYard,
        householdMembers,
        hasChildren,
        childrenAges = null,
        hasPets,
        petDetails = null,
        experience,
        hoursAlone,
        reason,
        petId
    }) {
        return this.prisma.adoption.create({
            data: { 
                id,
                fullName,
                email,
                phone,
                address,
                zipCode,
                housingType,
                ownOrRent,
                landlordApproval,
                hasYard,
                householdMembers,
                hasChildren,
                childrenAges,
                hasPets,
                petDetails,
                experience,
                hoursAlone,
                reason,
                petId
            }
        });
    }
}

module.exports = AdoptionEntity;