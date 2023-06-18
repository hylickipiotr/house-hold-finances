-- CreateIndex
CREATE FULLTEXT INDEX `transactions_title_idx` ON `transactions`(`title`);

-- CreateIndex
CREATE FULLTEXT INDEX `transactions_title_description_idx` ON `transactions`(`title`, `description`);
