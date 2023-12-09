-- AlterTable
ALTER TABLE `issue` ADD COLUMN `assignedToUsedId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignedToUsedId_fkey` FOREIGN KEY (`assignedToUsedId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
