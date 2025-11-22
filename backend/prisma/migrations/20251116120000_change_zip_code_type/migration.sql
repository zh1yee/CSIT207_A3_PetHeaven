-- Migration: change zip_code column type from INTEGER to VARCHAR(191)
-- Run with: npx prisma migrate deploy 

ALTER TABLE `User`
  MODIFY COLUMN `zip_code` VARCHAR(191) NOT NULL;


