/*
  Warnings:

  - You are about to drop the column `name` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Name]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Age` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Customer_name_key` ON `customer`;

-- AlterTable
ALTER TABLE `customer` DROP COLUMN `name`,
    DROP COLUMN `password`,
    ADD COLUMN `Age` VARCHAR(191) NOT NULL,
    ADD COLUMN `Name` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Customer_Name_key` ON `Customer`(`Name`);
