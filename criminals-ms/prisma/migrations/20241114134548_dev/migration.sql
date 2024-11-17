/*
  Warnings:

  - You are about to drop the column `Nationatily` on the `criminal` table. All the data in the column will be lost.
  - Added the required column `nationatily` to the `Criminal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `criminal` DROP COLUMN `Nationatily`,
    ADD COLUMN `nationatily` VARCHAR(191) NOT NULL;
