-- CreateTable
CREATE TABLE `Adoption` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `zipCode` VARCHAR(191) NOT NULL,
    `housingType` VARCHAR(191) NOT NULL,
    `ownOrRent` VARCHAR(191) NOT NULL,
    `landlordApproval` VARCHAR(191) NOT NULL,
    `hasYard` VARCHAR(191) NOT NULL,
    `householdMembers` VARCHAR(191) NOT NULL,
    `hasChildren` VARCHAR(191) NOT NULL,
    `childrenAges` VARCHAR(191) NOT NULL,
    `hasPets` VARCHAR(191) NOT NULL,
    `petDetails` VARCHAR(191) NOT NULL,
    `experience` VARCHAR(191) NOT NULL,
    `hoursAlone` VARCHAR(191) NOT NULL,
    `reason` VARCHAR(191) NOT NULL,
    `petId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Adoption` ADD CONSTRAINT `Adoption_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `Pets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
