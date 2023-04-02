-- AlterTable
INSERT INTO master_settings (name, value, created_on, updated_on, created_by, updated_by) VALUES('schoolcount011', '10', now(), now(), 1, 1);
-- AlterTable
ALTER TABLE `master_settings` MODIFY `created_by` VARCHAR(191) NOT NULL,
    MODIFY `updated_by` VARCHAR(191) NOT NULL;