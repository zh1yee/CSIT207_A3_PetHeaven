-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `street_address` VARCHAR(191) NOT NULL,
    `door_floor` VARCHAR(191) NOT NULL,
    `zip_code` INTEGER NOT NULL,
    `occupation` VARCHAR(191) NOT NULL,
    `interested` JSON NOT NULL,
    `subscrption` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `volunteer` VARCHAR(191) NOT NULL,
    `donation` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `breed` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `personality` JSON NOT NULL,
    `special` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Surrender` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `owner_name` VARCHAR(191) NOT NULL,
    `owner_address` VARCHAR(191) NOT NULL,
    `owner_email` VARCHAR(191) NOT NULL,
    `owner_phone` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `breed` VARCHAR(191) NOT NULL,
    `spayed` BOOLEAN NOT NULL,
    `vaccination` BOOLEAN NOT NULL,
    `microchipped` BOOLEAN NOT NULL,
    `health_issue` BOOLEAN NOT NULL,
    `issue_desc` VARCHAR(191) NOT NULL,
    `personality` VARCHAR(191) NOT NULL,
    `child_friendly` BOOLEAN NOT NULL,
    `pet_friendly` BOOLEAN NOT NULL,
    `reason` VARCHAR(191) NOT NULL,
    `urgent` VARCHAR(191) NOT NULL,
    `add_info` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
