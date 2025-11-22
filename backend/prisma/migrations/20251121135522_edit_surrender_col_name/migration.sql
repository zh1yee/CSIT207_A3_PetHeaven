/*
  Warnings:

  - You are about to drop the column `add_info` on the `surrender` table. All the data in the column will be lost.
  - You are about to drop the column `child_friendly` on the `surrender` table. All the data in the column will be lost.
  - You are about to drop the column `health_issue` on the `surrender` table. All the data in the column will be lost.
  - You are about to drop the column `issue_desc` on the `surrender` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `surrender` table. All the data in the column will be lost.
  - You are about to drop the column `pet_friendly` on the `surrender` table. All the data in the column will be lost.
  - You are about to drop the column `spayed` on the `surrender` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `surrender` table. All the data in the column will be lost.
  - You are about to drop the column `urgent` on the `surrender` table. All the data in the column will be lost.
  - You are about to drop the column `vaccination` on the `surrender` table. All the data in the column will be lost.
  - Added the required column `additionalInfo` to the `Surrender` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goodWithKids` to the `Surrender` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goodWithPets` to the `Surrender` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healthDetails` to the `Surrender` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healthIssues` to the `Surrender` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petName` to the `Surrender` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petType` to the `Surrender` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spayedNeutered` to the `Surrender` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urgency` to the `Surrender` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vaccinated` to the `Surrender` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `surrender` DROP COLUMN `add_info`,
    DROP COLUMN `child_friendly`,
    DROP COLUMN `health_issue`,
    DROP COLUMN `issue_desc`,
    DROP COLUMN `name`,
    DROP COLUMN `pet_friendly`,
    DROP COLUMN `spayed`,
    DROP COLUMN `type`,
    DROP COLUMN `urgent`,
    DROP COLUMN `vaccination`,
    ADD COLUMN `additionalInfo` VARCHAR(191) NOT NULL,
    ADD COLUMN `goodWithKids` VARCHAR(191) NOT NULL,
    ADD COLUMN `goodWithPets` VARCHAR(191) NOT NULL,
    ADD COLUMN `healthDetails` VARCHAR(191) NOT NULL,
    ADD COLUMN `healthIssues` VARCHAR(191) NOT NULL,
    ADD COLUMN `petName` VARCHAR(191) NOT NULL,
    ADD COLUMN `petType` VARCHAR(191) NOT NULL,
    ADD COLUMN `spayedNeutered` VARCHAR(191) NOT NULL,
    ADD COLUMN `urgency` VARCHAR(191) NOT NULL,
    ADD COLUMN `vaccinated` VARCHAR(191) NOT NULL;
