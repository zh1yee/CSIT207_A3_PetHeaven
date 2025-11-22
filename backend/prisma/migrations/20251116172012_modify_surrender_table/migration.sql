/*
  Warnings:

  - You are about to alter the column `spayed` on the `surrender` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.
  - You are about to alter the column `vaccination` on the `surrender` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.
  - You are about to alter the column `microchipped` on the `surrender` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.
  - You are about to alter the column `health_issue` on the `surrender` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.
  - You are about to alter the column `child_friendly` on the `surrender` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.
  - You are about to alter the column `pet_friendly` on the `surrender` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `surrender` MODIFY `owner_phone` VARCHAR(191) NOT NULL,
    MODIFY `age` VARCHAR(191) NOT NULL,
    MODIFY `spayed` VARCHAR(191) NOT NULL,
    MODIFY `vaccination` VARCHAR(191) NOT NULL,
    MODIFY `microchipped` VARCHAR(191) NOT NULL,
    MODIFY `health_issue` VARCHAR(191) NOT NULL,
    MODIFY `child_friendly` VARCHAR(191) NOT NULL,
    MODIFY `pet_friendly` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Surrender` ADD CONSTRAINT `Surrender_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
