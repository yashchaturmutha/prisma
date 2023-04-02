/*
  Warnings:

  - You are about to drop the column `Age` on the `customer` table. All the data in the column will be lost.
  - Added the required column `Created_by` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Created_on` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Updated_by` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Updated_on` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Value` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customer` DROP COLUMN `Age`,
    ADD COLUMN `Created_by` INTEGER NOT NULL,
    ADD COLUMN `Created_on` DATETIME(3) NOT NULL,
    ADD COLUMN `Updated_by` INTEGER NOT NULL,
    ADD COLUMN `Updated_on` DATETIME(3) NOT NULL,
    ADD COLUMN `Value` INTEGER NOT NULL;
