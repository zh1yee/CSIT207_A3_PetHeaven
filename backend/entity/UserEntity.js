const BaseEntity = require("./BaseEntity");

class UserEntity extends BaseEntity {
  constructor() {
    super();
  }

    async createUser({
        id = undefined,
        name,
        email,
        password,
        phone,
        street_address,
        door_floor = null,
        zip_code,
        occupation = null,
        interested = null,
        subscrption,
        volunteer,
        donation,
        message = null
    }) {
        return this.prisma.user.create({
            data: {
                id,
                name,
                email,
                password,
                phone,
                street_address,
                door_floor,
                zip_code,
                occupation,
                interested,
                subscrption,
                volunteer,
                donation,
                message
            }
        });
    }

    async login(email, password) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user || user.password !== password) {
            //throw new Error("Invalid email or password");
            return null; //controller will handle the response
        }

        return user;
    }
}

module.exports = UserEntity;