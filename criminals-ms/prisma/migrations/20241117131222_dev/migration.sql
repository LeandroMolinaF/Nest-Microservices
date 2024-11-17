-- CreateTable
CREATE TABLE `Criminal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `dateOfBirth` DATETIME(3) NOT NULL,
    `placeOfBirth` VARCHAR(191) NULL,
    `height` DOUBLE NULL,
    `colourOfEyes` VARCHAR(191) NULL,
    `colourOfHair` VARCHAR(191) NULL,
    `characteristics` VARCHAR(191) NULL,
    `charges` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
