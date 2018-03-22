module.exports = function(){  
	var createTablesSQLStatement = String("DROP TABLE IF EXISTS `employee_plot`;DROP TABLE IF EXISTS `equipment`;DROP TABLE IF EXISTS `building`;DROP TABLE IF EXISTS `employee`;DROP TABLE IF EXISTS `animal_feed`;DROP TABLE IF EXISTS `feed`;DROP TABLE IF EXISTS `animal`;DROP TABLE IF EXISTS `plant_manure`;DROP TABLE IF EXISTS `animal_type`;DROP TABLE IF EXISTS `plant`;DROP TABLE IF EXISTS `plant_type`;DROP TABLE IF EXISTS `plot`;CREATE TABLE `plot`(`id` int(11)NOT NULL AUTO_INCREMENT,`type` ENUM('Pasture','Nightshade','Legume','Brassica','Root Vegetable','Woodland','Spring Wheat','Winter Wheat','Oats','Fruit')NOT NULL,`cycle_status` int(1) NOT NULL check(Cycle_Status between 0 and 5),`previous_type` ENUM('Pasture','Nightshade','Legume','Brassica','Root Vegetable','Woodland','Spring Wheat','Winter Wheat','Oats','Fruit','N/A'),PRIMARY KEY (id))ENGINE=InnoDB DEFAULT CHARSET=latin1;CREATE TABLE `employee` (`id` int(11) AUTO_INCREMENT NOT NULL,`first_name` varchar(255) NOT NULL,`last_name` varchar(255) NOT NULL,`dob` date,`hourly_wage` decimal(5,2) NOT NULL,`phone_number` char(10) NOT NULL,`address` varchar(255),PRIMARY KEY (`id`),CONSTRAINT `uniquefirstandlast` UNIQUE (`first_name`, `last_name`)) ENGINE=InnoDB DEFAULT CHARSET=latin1;CREATE TABLE `employee_plot` (`plot_id` int(11) NOT NULL,`employee_id` int(11) NOT NULL,PRIMARY KEY (`plot_id`, `employee_id`),CONSTRAINT `fk_plot_id` FOREIGN KEY (`plot_id`) REFERENCES `plot` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,CONSTRAINT `fk_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=latin1;CREATE TABLE `building` (`id` int(11) NOT NULL AUTO_INCREMENT,`name` varchar(255),`year_built` int(4) check (`year_built` >= 1600),PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1;CREATE TABLE `equipment` (`id` int(11) NOT NULL AUTO_INCREMENT,`name` varchar(255),`building` int(11),`doa` date,`last_maintenance` date,`employee_steward` int (11),PRIMARY KEY (`id`),CONSTRAINT `fk_building` FOREIGN KEY (`building`) REFERENCES `building` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,CONSTRAINT `employee_steward` FOREIGN KEY (`employee_steward`) REFERENCES `employee` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=latin1;CREATE TABLE `animal_type` (`name` varchar(255) NOT NULL,`size` ENUM('<10lbs', '10-30lbs', '31-50lbs', '51-100lbs', '101-600lbs', '601+lbs'),PRIMARY KEY (`name`)) ENGINE=InnoDB DEFAULT CHARSET=latin1;CREATE TABLE `feed` (`id` int(11) NOT NULL AUTO_INCREMENT,`name` varchar(255),`source` varchar(255),`inventory_units` varchar(255),`inventory_remaining` int(11),PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1;CREATE TABLE `animal_feed` (`animal_name` varchar(255) NOT NULL,`feed_id` int(11) NOT NULL,PRIMARY KEY (`feed_id`, `animal_name`),CONSTRAINT `fk_feed_id` FOREIGN KEY (`feed_id`) REFERENCES `feed` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,CONSTRAINT `fk_animal_name` FOREIGN KEY (`animal_name`) REFERENCES `animal_type` (`name`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=latin1;CREATE TABLE `animal` (`id` int(11) NOT NULL AUTO_INCREMENT,`plot` int(11),`slaughter_date` date,`dob_or_doa` date,`type` varchar(255) NOT NULL,PRIMARY KEY (`id`),CONSTRAINT `fk_animal_plot` FOREIGN KEY (`plot`) REFERENCES `plot` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,CONSTRAINT `fk_animal_type` FOREIGN KEY (`type`) REFERENCES `animal_type` (`name`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=latin1;CREATE TABLE`plant_type` (`name` varchar(255) NOT NULL,`growing_season` ENUM('Fall', 'Winter', 'Spring', 'Summer'),PRIMARY KEY (`name`)) ENGINE=InnoDB DEFAULT CHARSET=latin1;CREATE TABLE `plant` (`id` int(11) NOT NULL AUTO_INCREMENT,`plot` int(11),`date_planted` date,`harvest_date` date,`type` varchar(255) NOT NULL,PRIMARY KEY (`id`),CONSTRAINT `fk_plant_plot` FOREIGN KEY (`plot`) REFERENCES `plot` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,CONSTRAINT `fk_plant_type` FOREIGN KEY (`type`) REFERENCES `plant_type` (`name`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=latin1;CREATE TABLE `plant_manure` (`plant_name` varchar(255) NOT NULL,`manure_type` varchar(255) NOT NULL,PRIMARY KEY (`plant_name`, `manure_type`),CONSTRAINT `fk_plant_name` FOREIGN KEY (`plant_name`) REFERENCES `plant_type` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,CONSTRAINT `fk_manure_type` FOREIGN KEY (`manure_type`) REFERENCES `animal_type` (`name`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=latin1;INSERT INTO plot (type, cycle_status, previous_type)VALUES  ('Pasture', 1, 'Root Vegetable'),('Pasture', 1, 'Root Vegetable'),('Nightshade', 2, 'Pasture'),('Nightshade', 2, 'Pasture'),('Legume', 3, 'Nightshade'),('Legume', 3, 'Nightshade'),('Brassica', 4, 'Legume'),('Brassica', 4, 'Legume'),('Root Vegetable', 1, 'Brassica'),('Root Vegetable', 1, 'Brassica'),('Woodland', 0, 'Root Vegetable'),('Woodland', 0, 'Root Vegetable'),('Spring Wheat', 1, 'Pasture'),('Spring Wheat', 1, 'Pasture'),('Winter Wheat', 3, 'Spring Wheat'),('Winter Wheat', 3, 'Nightshade'),('Oats', 4, 'Spring Wheat'),('Oats', 4, 'Brassica'),('Pasture', 1, 'Root Vegetable'),('Pasture', 1, 'Root Vegetable'),('Woodland', 0, null),('Woodland', 0, null),('Fruit', 2, 'Brassica'),('Fruit', 4, 'Root Vegetable');INSERT INTO employee (first_name, last_name, dob, hourly_wage, phone_number, address)VALUES ('Adam', 'Smith', '1975-01-02', 14.50, '1111111111', '2310 Whispering Pine Dr. Missouri City, TX'),   ('Richard', 'Thomas', '1986-03-12', 11.50, '2222222222', '150 East South St. Hockley, TX'),   ('Christina', 'Florence', '1964-08-17', 17.50, '3333333333', '587 Sam Houston Ln. Katy, TX'),   ('Kara', 'Applebee', '1990-07-28', 10.00, '4444444444', '892 Preston Ave. Houston, TX'),   ('Jovita', 'Yates', '1980-09-04', 15.00, '5555555555', '4130 Lexington Blvd. Sugarland, TX'),   ('Paul', 'Rogers', '1977-04-15', 19.50, '6666666666', '9854 Monarch Dr. Asheville, NC');INSERT INTO employee_plot (plot_id, employee_id) VALUES (11, (SELECT id from employee where first_name = 'Adam' and last_name = 'Smith')),(21, (SELECT id from employee where first_name = 'Richard' and last_name = 'Thomas')),(31, (SELECT id from employee where first_name = 'Christina' and last_name = 'Florence')),(41, (SELECT id from employee where first_name = 'Kara' and last_name = 'Applebee')),(51, (SELECT id from employee where first_name = 'Jovita' and last_name = 'Yates')),(61, (SELECT id from employee where first_name = 'Paul' and last_name = 'Rogers')),(71, (SELECT id from employee where first_name = 'Adam' and last_name = 'Smith')),(81, (SELECT id from employee where first_name = 'Richard' and last_name = 'Thomas')),(91, (SELECT id from employee where first_name = 'Christina' and last_name = 'Florence')),(101, (SELECT id from employee where first_name = 'Kara' and last_name = 'Applebee')),(111, (SELECT id from employee where first_name = 'Jovita' and last_name = 'Yates')),(121, (SELECT id from employee where first_name = 'Paul' and last_name = 'Rogers')),(131, (SELECT id from employee where first_name = 'Adam' and last_name = 'Smith')),(141, (SELECT id from employee where first_name = 'Richard' and last_name = 'Thomas')),(151, (SELECT id from employee where first_name = 'Christina' and last_name = 'Florence')),(161, (SELECT id from employee where first_name = 'Kara' and last_name = 'Applebee')),(171, (SELECT id from employee where first_name = 'Jovita' and last_name = 'Yates')),(181, (SELECT id from employee where first_name = 'Paul' and last_name = 'Rogers')),(191, (SELECT id from employee where first_name = 'Adam' and last_name = 'Smith')),(201, (SELECT id from employee where first_name = 'Adam' and last_name = 'Smith')),(11, (SELECT id from employee where first_name = 'Richard' and last_name = 'Thomas')),(21, (SELECT id from employee where first_name = 'Christina' and last_name = 'Florence')),(31, (SELECT id from employee where first_name = 'Kara' and last_name = 'Applebee')),(41, (SELECT id from employee where first_name = 'Jovita' and last_name = 'Yates')),(51, (SELECT id from employee where first_name = 'Paul' and last_name = 'Rogers')),(61, (SELECT id from employee where first_name = 'Adam' and last_name = 'Smith')),(71, (SELECT id from employee where first_name = 'Richard' and last_name = 'Thomas')),(81, (SELECT id from employee where first_name = 'Christina' and last_name = 'Florence')),(91, (SELECT id from employee where first_name = 'Kara' and last_name = 'Applebee')),(101, (SELECT id from employee where first_name = 'Jovita' and last_name = 'Yates'));"); 
	
	return createTablesSQLStatement;
}