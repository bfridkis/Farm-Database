module.exports = function(){  
	var createTablesSQLStatement = String("DROP TABLE IF EXISTS `employee_plot`;DROP TABLE IF EXISTS `equipment`;DROP TABLE IF EXISTS `building`;DROP TABLE IF EXISTS `employee`;DROP TABLE IF EXISTS `animal_feed`;DROP TABLE IF EXISTS `feed`;DROP TABLE IF EXISTS `animal`;DROP TABLE IF EXISTS `plant_manure`;DROP TABLE IF EXISTS `animal_type`;DROP TABLE IF EXISTS `plant`;DROP TABLE IF EXISTS `plant_type`;DROP TABLE IF EXISTS `plot`;CREATE TABLE `plot`(`id` int(11)NOT NULL AUTO_INCREMENT,`type` ENUM('Pasture','Nightshade','Legume','Brassica','Root Vegetable','Woodland','Spring Wheat','Winter Wheat','Oats','Fruit')NOT NULL,`cycle_status` int(1) NOT NULL check(Cycle_Status between 0 and 5),`previous_type` ENUM('Pasture','Nightshade','Legume','Brassica','Root Vegetable','Woodland','Spring Wheat','Winter Wheat','Oats','Fruit','N/A'),PRIMARY KEY (id))ENGINE=InnoDB DEFAULT CHARSET=latin1;CREATE TABLE `employee` (`id` int(11) AUTO_INCREMENT NOT NULL,`first_name` varchar(255) NOT NULL,`last_name` varchar(255) NOT NULL,`dob` date,`hourly_wage` decimal(5,2) NOT NULL,`phone_number` char(10) NOT NULL,`address` varchar(255),PRIMARY KEY (`id`),CONSTRAINT `uniquefirstandlast` UNIQUE (`first_name`, `last_name`)) ENGINE=InnoDB DEFAULT CHARSET=latin1;CREATE TABLE `employee_plot` (`plot_id` int(11) NOT NULL,`employee_id` int(11) NOT NULL,PRIMARY KEY (`plot_id`, `employee_id`),CONSTRAINT `fk_plot_id` FOREIGN KEY (`plot_id`) REFERENCES `plot` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,CONSTRAINT `fk_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=latin1;CREATE TABLE `building` (`id` int(11) NOT NULL AUTO_INCREMENT,`name` varchar(255),`year_built` int(4) check (`year_built` >= 1600),PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1;CREATE TABLE `equipment` (`id` int(11) NOT NULL AUTO_INCREMENT,`name` varchar(255),`building` int(11),`doa` date,`last_maintenance` date,`employee_steward` int (11),PRIMARY KEY (`id`),CONSTRAINT `fk_building` FOREIGN KEY (`building`) REFERENCES `building` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,CONSTRAINT `employee_steward` FOREIGN KEY (`employee_steward`) REFERENCES `employee` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=latin1;CREATE TABLE `animal_type` (`name` varchar(255) NOT NULL,`size` ENUM('<10lbs', '10-30lbs', '31-50lbs', '51-100lbs', '101-600lbs', '601+lbs'),PRIMARY KEY (`name`)) ENGINE=InnoDB DEFAULT CHARSET=latin1;CREATE TABLE `feed` (`id` int(11) NOT NULL AUTO_INCREMENT,`name` varchar(255),`source` varchar(255),`inventory_units` varchar(255),`inventory_remaining` int(11),PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1;CREATE TABLE `animal_feed` (`animal_name` varchar(255) NOT NULL,`feed_id` int(11) NOT NULL,PRIMARY KEY (`feed_id`, `animal_name`),CONSTRAINT `fk_feed_id` FOREIGN KEY (`feed_id`) REFERENCES `feed` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,CONSTRAINT `fk_animal_name` FOREIGN KEY (`animal_name`) REFERENCES `animal_type` (`name`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=latin1;CREATE TABLE `animal` (`id` int(11) NOT NULL AUTO_INCREMENT,`plot` int(11),`slaughter_date` date,`dob_or_doa` date,`type` varchar(255) NOT NULL,PRIMARY KEY (`id`),CONSTRAINT `fk_animal_plot` FOREIGN KEY (`plot`) REFERENCES `plot` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,CONSTRAINT `fk_animal_type` FOREIGN KEY (`type`) REFERENCES `animal_type` (`name`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=latin1;CREATE TABLE`plant_type` (`name` varchar(255) NOT NULL,`growing_season` ENUM('Fall', 'Winter', 'Spring', 'Summer'),PRIMARY KEY (`name`)) ENGINE=InnoDB DEFAULT CHARSET=latin1;CREATE TABLE `plant` (`id` int(11) NOT NULL AUTO_INCREMENT,`plot` int(11),`date_planted` date,`harvest_date` date,`type` varchar(255) NOT NULL,PRIMARY KEY (`id`),CONSTRAINT `fk_plant_plot` FOREIGN KEY (`plot`) REFERENCES `plot` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,CONSTRAINT `fk_plant_type` FOREIGN KEY (`type`) REFERENCES `plant_type` (`name`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=latin1;CREATE TABLE `plant_manure` (`plant_name` varchar(255) NOT NULL,`manure_type` varchar(255) NOT NULL,PRIMARY KEY (`plant_name`, `manure_type`),CONSTRAINT `fk_plant_name` FOREIGN KEY (`plant_name`) REFERENCES `plant_type` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,CONSTRAINT `fk_manure_type` FOREIGN KEY (`manure_type`) REFERENCES `animal_type` (`name`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=latin1;INSERT INTO plot (type, cycle_status, previous_type)VALUES  ('Pasture', 1, 'Root Vegetable'),('Pasture', 1, 'Root Vegetable'),('Nightshade', 2, 'Pasture'),('Nightshade', 2, 'Pasture'),('Legume', 3, 'Nightshade'),('Legume', 3, 'Nightshade'),('Brassica', 4, 'Legume'),('Brassica', 4, 'Legume'),('Root Vegetable', 1, 'Brassica'),('Root Vegetable', 1, 'Brassica'),('Woodland', 0, 'Root Vegetable'),('Woodland', 0, 'Root Vegetable'),('Spring Wheat', 1, 'Pasture'),('Spring Wheat', 1, 'Pasture'),('Winter Wheat', 3, 'Spring Wheat'),('Winter Wheat', 3, 'Nightshade'),('Oats', 4, 'Spring Wheat'),('Oats', 4, 'Brassica'),('Pasture', 1, 'Root Vegetable'),('Pasture', 1, 'Root Vegetable'),('Woodland', 0, null),('Woodland', 0, null),('Fruit', 2, 'Brassica'),('Fruit', 4, 'Root Vegetable');"); 

	return createTablesSQLStatement;
}