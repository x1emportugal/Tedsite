CREATE TABLE `photos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`url` text NOT NULL,
	`fileKey` varchar(512) NOT NULL,
	`section` enum('galeria','carrossel','hero','atividades') NOT NULL DEFAULT 'galeria',
	`caption` varchar(255),
	`displayOrder` int NOT NULL DEFAULT 0,
	`active` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `photos_id` PRIMARY KEY(`id`)
);
