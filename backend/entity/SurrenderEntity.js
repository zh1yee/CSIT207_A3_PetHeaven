const BaseEntity = require("./BaseEntity");

class SurrenderEntity extends BaseEntity {
  constructor() {
    super();
  }

    async createSurrender({
        id=undefined,
        userId,
        owner_name,
        owner_address,
        owner_email,
        owner_phone,
        petName,
        petType,
        age,
        gender,
        breed,
        spayedNeutered,
        vaccinated,
        microchipped,
        healthIssues,
        healthDetails = null,
        personality,
        goodWithKids,
        goodWithPets,
        reason,
        urgency,
        additionalInfo = null
    }) {
        return this.prisma.surrender.create({
            data: {
                id,
                userId,
                owner_name,
                owner_address,
                owner_email,
                owner_phone,
                petName,
                petType,
                age,
                gender,
                breed,
                spayedNeutered,
                vaccinated,
                microchipped,
                healthIssues,
                healthDetails,
                personality,
                goodWithKids,
                goodWithPets,
                reason,
                urgency,
                additionalInfo     
            }
        });
    }
}

module.exports = SurrenderEntity;