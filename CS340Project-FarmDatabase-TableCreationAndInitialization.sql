-- Benjamin Fridkis
-- Table Definitions and Initial Data Entry - Final Project
-- CS340 - INTRODUCTION TO DATABASES
-- ---------------------------------------------------------

-- Drop Tables IF Previously Existing
DROP TABLE IF EXISTS `employee_plot`;
DROP TABLE IF EXISTS `equipment`;
DROP TABLE IF EXISTS `building`;
DROP TABLE IF EXISTS `employee`;
DROP TABLE IF EXISTS `animal_feed`;
DROP TABLE IF EXISTS `feed`;
DROP TABLE IF EXISTS `animal`;
DROP TABLE IF EXISTS `plant_manure`;
DROP TABLE IF EXISTS `animal_type`;
DROP TABLE IF EXISTS `plant`;
DROP TABLE IF EXISTS `plant_type`;
DROP TABLE IF EXISTS `plot`;

-- PLOT TABLE --
-- id - an auto incrementing integer which is the primary key
-- type - enumerated type
-- -- Options:
-- --    'Pasture'
-- --    'Nightshade'
-- --    'Legume'
-- --	 'Brassica'
-- --	 'Root Vegetable'
-- --	 'Woodland'
-- --    'Spring Wheat'
-- --    'Winter Wheat'
-- --    'Oats'
-- --	 'Fruit'
-- cycle_status - an int in range of 1 - 5 denoting plot's current rotation cycle number
-- -- 0 = non-rotating plot
-- -- 1 = 1st year after lying fallow
-- -- 2 = 2nd year after lying fallow
-- -- 3 = 3rd year after lying fallow
-- -- 4 = 4th year after lying fallow
-- -- 5 = fallow
-- previous_Type - enumerate type (see above for "type")

CREATE TABLE `plot` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` ENUM('Pasture', 'Nightshade', 'Legume', 'Brassica', 'Root Vegetable', 
	'Woodland', 'Spring Wheat', 'Winter Wheat', 'Oats', 'Fruit') NOT NULL,
  `cycle_status` int(1) NOT NULL check (`Cycle_Status` between 0 and 5),
  `previous_type` ENUM('Pasture', 'Nightshade', 'Legume', 'Brassica', 'Root Vegetable', 
	'Woodland', 'Spring Wheat', 'Winter Wheat', 'Oats', 'Fruit', 'N/A'),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- EMPLOYEE TABLE --
-- id - an auto incrementing integer which is the primary key
-- first_name - a varchar of maximum length 255, cannot be null
-- last_name - a varchar of maximum length 255, cannot be null
-- dob - a date type -- employee's birthday
-- hourly_wage - a decimal value in range of 0 - 999.99
-- phone_number - a char of length 10
-- address - a varchar of maximum length 255
-- the combination of the first_name and last_name must be unique in this table

-- -- check (`phone_number` REGEXP '^[0-9]+$'),
-- -- check (`phone_number` >= 1000000000),
-- -- check (`hourly_wage` >= 0),

CREATE TABLE `employee` (
  `id` int(11) AUTO_INCREMENT NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `dob` date,
  `hourly_wage` decimal(5,2) NOT NULL,
  `phone_number` char(10) NOT NULL,
  `address` varchar(255),
  PRIMARY KEY (`id`),
  CONSTRAINT `uniquefirstandlast` UNIQUE (`first_name`, `last_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- EMPLOYEE_PLOT TABLE --
-- Represents many-to-many relationship between employee and plot
-- -- Denotes employees' assignments to plots
-- plot_id - foreign key reference to primary key `id` of Plot table
-- -- integer
-- employee_id - foreign key reference to primary key `id` of employee table
-- -- integer
-- Primary key is the combination of table's two attributes

CREATE TABLE `employee_plot` (
  `plot_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  PRIMARY KEY (`plot_id`, `employee_id`),
  CONSTRAINT `fk_plot_id` FOREIGN KEY (`plot_id`) REFERENCES `plot` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- BUILDING TABLE --
-- id - an auto incrementing integer which is the primary key
-- name - a varchar of maximum length 255
-- year_built - an int between 1600 and 9999
-- doa - a date type -- date of acquisition
-- last_maintenance - a date type -- date equipment was last serviced
-- employee_steward - foreign key reference to primary key `id` of employee table

CREATE TABLE `building` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `year_built` int(4) check (`year_built` >= 1600),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- EQUIPMENT TABLE --
-- id - an auto incrementing integer which is the primary key
-- name - a varchar of maximum length 255
-- building - foreign key reference to primary key `id` of building table
-- doa - a date type -- date of acquisition
-- last_maintenance - a date type -- date equipment was last serviced
-- employee_steward - foreign key reference to primary key `id` of employee table

CREATE TABLE `equipment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `building` int(11),
  `doa` date,
  `last_maintenance` date,
  `employee_steward` int (11),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_building` FOREIGN KEY (`building`) REFERENCES `building` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `employee_steward` FOREIGN KEY (`employee_steward`) REFERENCES `employee` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ANIMAL_TYPE TABLE --
-- name - a varchar of maximum length 255 which is the primary key
-- size - enumerated type
-- -- Options:
-- --    '<10lbs'
-- --    '10-30lbs'
-- --    '31-50lbs'
-- --	 '51-100lbs'
-- --	 '101-600lbs'
-- --	 '601+lbs'

CREATE TABLE `animal_type` (
  `name` varchar(255) NOT NULL,
  `size` ENUM('<10lbs', '10-30lbs', '31-50lbs', '51-100lbs', '101-600lbs', '601+lbs'),
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- FEED TABLE --
-- id - an auto incrementing integer which is the primary key
-- name - a varchar of maximum length 255
-- source - a varchar of maximum length 255
-- inventory_units - a varchar of maximum length 255
-- inventory_remaining - int(11)

CREATE TABLE `feed` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `source` varchar(255),
  `inventory_units` varchar(255),
  `inventory_remaining` int(11),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ANIMAL_FEED TABLE --
-- Represents many-to-many relationship between employee and plot
-- -- Denotes feed types for animal types
-- feed_id - foreign key reference to primary key `id` of feed_type table
-- animal_name -- foreign key reference to primary key `id` of animal_type table
-- Primary key is the combination of table's two attributes

CREATE TABLE `animal_feed` (
  `animal_name` varchar(255) NOT NULL,
  `feed_id` int(11) NOT NULL,
  PRIMARY KEY (`feed_id`, `animal_name`),
  CONSTRAINT `fk_feed_id` FOREIGN KEY (`feed_id`) REFERENCES `feed` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_animal_name` FOREIGN KEY (`animal_name`) REFERENCES `animal_type` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ANIMAL TABLE --
-- id - an auto incrementing integer which is the primary key
-- plot - foreign key reference to primary key `id` of plot table
-- slaughter_date - date type for expected day of slaughter
-- dob_or_doa - a date type -- date of acquisition or birth
-- type - foreign key reference to primary key `id` of animal_type table

CREATE TABLE `animal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plot` int(11),
  `slaughter_date` date,
  `dob_or_doa` date,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_animal_plot` FOREIGN KEY (`plot`) REFERENCES `plot` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_animal_type` FOREIGN KEY (`type`) REFERENCES `animal_type` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- PLANT_TYPE TABLE --
-- name - a varchar of maximum length 255 which is the primary key
-- growing_season - an enumerated type
-- -- Options:
-- --    'Fall'
-- --    'Winter'
-- --    'Spring'
-- --	 'Summer'

CREATE TABLE `plant_type` (
  `name` varchar(255) NOT NULL,
  `growing_season` ENUM('Fall', 'Winter', 'Spring', 'Summer'),
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- PLANT TABLE --
-- id - an auto incrementing integer which is the primary key
-- plot - foreign key reference to primary key `id` of plot table
-- date_planted - date type for date sown
-- harvest_date - a date type -- date of expected harvest
-- type - foreign key reference to primary key `id` of plant_type table

CREATE TABLE `plant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plot` int(11),
  `date_planted` date,
  `harvest_date` date,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_plant_plot` FOREIGN KEY (`plot`) REFERENCES `plot` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_plant_type` FOREIGN KEY (`type`) REFERENCES `plant_type` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- PLANT_MANURE TABLE --
-- Represents many-to-many relationship between plant_type and manure_type
-- plant_name - foreign key reference to primary key `name` of plant_type table
-- manure_type - foreign key reference to primary key `name` of animal_type table
-- Primary key is the combination of table's two attributes

CREATE TABLE `plant_manure` (
  `plant_name` varchar(255) NOT NULL,
  `manure_type` varchar(255) NOT NULL,
  PRIMARY KEY (`plant_name`, `manure_type`),
  CONSTRAINT `fk_plant_name` FOREIGN KEY (`plant_name`) REFERENCES `plant_type` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_manure_type` FOREIGN KEY (`manure_type`) REFERENCES `animal_type` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ************************************ INSERTIONS **************************************

-- PLOT TABLE INSERTIONS --
INSERT INTO plot (type, cycle_status, previous_type)
	VALUES  ('Pasture', 1, 'Root Vegetable'),
		    ('Pasture', 1, 'Root Vegetable'),
		    ('Nightshade', 2, 'Pasture'),
			('Nightshade', 2, 'Pasture'),
			('Legume', 3, 'Nightshade'),
			('Legume', 3, 'Nightshade'),
			('Brassica', 4, 'Legume'),
			('Brassica', 4, 'Legume'),
			('Root Vegetable', 1, 'Brassica'),
			('Root Vegetable', 1, 'Brassica'),
			('Woodland', 0, 'Root Vegetable'),
			('Woodland', 0, 'Root Vegetable'),
			('Spring Wheat', 1, 'Pasture'),
			('Spring Wheat', 1, 'Pasture'),
			('Winter Wheat', 3, 'Spring Wheat'),
			('Winter Wheat', 3, 'Nightshade'),
			('Oats', 4, 'Spring Wheat'),
			('Oats', 4, 'Brassica'),
			('Pasture', 1, 'Root Vegetable'),
			('Pasture', 1, 'Root Vegetable'),
			('Woodland', 0, null),
			('Woodland', 0, null),
			('Fruit', 2, 'Brassica'),
			('Fruit', 4, 'Root Vegetable');

-- EMPLOYEE TABLE INSERTIONS --
INSERT INTO employee (first_name, last_name, dob, hourly_wage, phone_number, address)
	VALUES ('Adam', 'Smith', '1975-01-02', 14.50, '1111111111', '2310 Whispering Pine Dr. Missouri City, TX'),
		   ('Richard', 'Thomas', '1986-03-12', 11.50, '2222222222', '150 East South St. Hockley, TX'),
		   ('Christina', 'Florence', '1964-08-17', 17.50, '3333333333', '587 Sam Houston Ln. Katy, TX'),
		   ('Kara', 'Applebee', '1990-07-28', 10.00, '4444444444', '892 Preston Ave. Houston, TX'),
		   ('Jovita', 'Yates', '1980-09-04', 15.00, '5555555555', '4130 Lexington Blvd. Sugarland, TX'),
		   ('Paul', 'Rogers', '1977-04-15', 19.50, '6666666666', '9854 Monarch Dr. Asheville, NC');
		
-- EMPLOYEE_PLOT TABLE INSERTIONS --
INSERT INTO employee_plot (plot_id, employee_id) VALUES 
	(11, (SELECT id from employee where first_name = 'Adam' and last_name = 'Smith')),
	(21, (SELECT id from employee where first_name = 'Richard' and last_name = 'Thomas')),
	(31, (SELECT id from employee where first_name = 'Christina' and last_name = 'Florence')),
	(41, (SELECT id from employee where first_name = 'Kara' and last_name = 'Applebee')),
	(51, (SELECT id from employee where first_name = 'Jovita' and last_name = 'Yates')),
	(61, (SELECT id from employee where first_name = 'Paul' and last_name = 'Rogers')),
	(71, (SELECT id from employee where first_name = 'Adam' and last_name = 'Smith')),
	(81, (SELECT id from employee where first_name = 'Richard' and last_name = 'Thomas')),
	(91, (SELECT id from employee where first_name = 'Christina' and last_name = 'Florence')),
	(101, (SELECT id from employee where first_name = 'Kara' and last_name = 'Applebee')),
	(111, (SELECT id from employee where first_name = 'Jovita' and last_name = 'Yates')),
	(121, (SELECT id from employee where first_name = 'Paul' and last_name = 'Rogers')),
	(131, (SELECT id from employee where first_name = 'Adam' and last_name = 'Smith')),
	(141, (SELECT id from employee where first_name = 'Richard' and last_name = 'Thomas')),
	(151, (SELECT id from employee where first_name = 'Christina' and last_name = 'Florence')),
	(161, (SELECT id from employee where first_name = 'Kara' and last_name = 'Applebee')),
	(171, (SELECT id from employee where first_name = 'Jovita' and last_name = 'Yates')),
	(181, (SELECT id from employee where first_name = 'Paul' and last_name = 'Rogers')),
	(191, (SELECT id from employee where first_name = 'Adam' and last_name = 'Smith')),
	(201, (SELECT id from employee where first_name = 'Adam' and last_name = 'Smith')),
	(11, (SELECT id from employee where first_name = 'Richard' and last_name = 'Thomas')),
	(21, (SELECT id from employee where first_name = 'Christina' and last_name = 'Florence')),
	(31, (SELECT id from employee where first_name = 'Kara' and last_name = 'Applebee')),
	(41, (SELECT id from employee where first_name = 'Jovita' and last_name = 'Yates')),
	(51, (SELECT id from employee where first_name = 'Paul' and last_name = 'Rogers')),
	(61, (SELECT id from employee where first_name = 'Adam' and last_name = 'Smith')),
	(71, (SELECT id from employee where first_name = 'Richard' and last_name = 'Thomas')),
	(81, (SELECT id from employee where first_name = 'Christina' and last_name = 'Florence')),
	(91, (SELECT id from employee where first_name = 'Kara' and last_name = 'Applebee')),
	(101, (SELECT id from employee where first_name = 'Jovita' and last_name = 'Yates'));

-- BUILDING TABLE INSERTIONS --
INSERT INTO building (name, year_built) VALUES 
	('Tool Shed East', 1976),
	('Tool Shed West', 1985),
	('Tool Shed North', 2001),
	('Tool Shed South', 2012),
	('Barn East', 1976),
	('Barn West', 1985);
	
-- EQUIPMENT TABLE INSERTIONS --
INSERT INTO equipment (name, building, doa, last_maintenance, employee_steward) VALUES 
	('Garden Hoe', (SELECT id FROM building where name = 'Tool Shed East'), '2012-01-01', '2017-09-09',
		(SELECT id from employee where first_name = 'Adam' and last_name = 'Smith')),
	('Big Tractor', (SELECT id FROM building where name = 'Barn East'), '2007-01-01', '2016-10-12',
		(SELECT id from employee where first_name = 'Richard' and last_name = 'Thomas')),
	('Small Tractor', (SELECT id FROM building where name = 'Barn West'), '2015-07-12', '2013-11-16',
		(SELECT id from employee where first_name = 'Jovita' and last_name = 'Yates')),
	('Wheelbarrow', (SELECT id FROM building where name = 'Tool Shed North'), '2006-05-24', null,
		(SELECT id from employee where first_name = 'Christina' and last_name = 'Florence')),
	('Spade', (SELECT id FROM building where name = 'Tool Shed South'), '2008-08-18', null,
		(SELECT id from employee where first_name = 'Kara' and last_name = 'Applebee')),
	('Shovel', (SELECT id FROM building where name = 'Tool Shed West'), '2002-02-12', null, null);

-- ANIMAL_TYPE TABLE INSERTIONS --
INSERT INTO animal_type (name, size)
	VALUES  ('Pig', '51-100lbs'),
		    ('Large Pig', '101-600lbs'),
			('Cow', '601+lbs'),
			('Small Cow', '101-600lbs'),
			('Hen', '10-30lbs'),
			('Rooster', '10-30lbs'),
			('Goat', '101-600lbs'),
			('Dog', '51-100lbs'),
			('Sheep', '101-600lbs'),
			('Rabbit', '<10lbs'),
			('Cat', null);
			
-- ANIMAL TABLE INSERTIONS --			
INSERT INTO animal (plot, slaughter_date, dob_or_doa, type)
	VALUES  (11, '2014-08-09', '2018-05-19', 'Cow'),
		    (11, '2014-08-09', '2018-04-19', 'Cow'),
		    (11, '2014-08-09', '2018-05-03', 'Cow'),
			(21, '2014-08-09', '2018-05-07', 'Cow'),
			(21, '2014-08-09', '2018-05-11', 'Cow'),
			(21, '2014-08-09', '2018-04-02', 'Cow'),
			(null, null, '2013-02-02', 'Dog'),
			(null, null, '2013-11-04', 'Dog'),
			(null, null, '2015-05-13', 'Cat'),
			(null, null, '2012-06-04', 'Cat'),
			(31, '2018-09-05', '2012-06-04', 'Pig'),
			(41, '2018-09-05', '2012-06-12', 'Pig'),
			(31, '2018-09-05', '2015-06-21', 'Large Pig'),
			(41, '2018-09-05', '2015-07-01', 'Large Pig'),
			(191, '2018-09-05', '2017-08-01', 'Hen'),
			(191, '2018-10-15', '2017-07-29', 'Hen'),
			(201, '2018-10-15', '2017-07-15', 'Hen'),
			(201, '2018-10-15', '2017-07-20', 'Hen'),
			(201, '2018-10-15', '2017-07-21', 'Rooster');
			
-- FEED TABLE INSERTIONS --			
INSERT INTO feed (name, source, inventory_units, inventory_remaining)
	VALUES  ('Alfalfa Hay', "Ted's Tractor and Supply", 'bales', 100),
		    ('Organic Chicken Seed', "Ted's Tractor and Supply", 'lbs', 1000),
		    ('Vegetable Fodder', "Produced On Site", 'lbs', 500),
			('Whey', "Produced On Site", 'gal', 500),
			('Dog Food', "Petco", 'bags', 10),
			('Cat Food', "Petco", 'bags', 10),
			("Earl's Organic Livestock Grain Mix", "Earl's Feed Store", 'tons', 10);
			
-- ANIMAL_FEED TABLE INSERTIONS --			
INSERT INTO animal_feed (feed_id, animal_name)
	VALUES  ((SELECT id from feed where name = 'Alfalfa Hay'), 
			 (SELECT name from animal_type where name = 'Cow')),
		    ((SELECT id from feed where name = 'Alfalfa Hay'), 
			 (SELECT name from animal_type where name = 'Small Cow')),
			((SELECT id from feed where name = 'Vegetable Fodder'), 
			 (SELECT name from animal_type where name = 'Pig')),
			((SELECT id from feed where name = 'Vegetable Fodder'), 
			 (SELECT name from animal_type where name = 'Large Pig')),
			((SELECT id from feed where name = 'Whey'), 
			 (SELECT name from animal_type where name = 'Pig')),
			((SELECT id from feed where name = 'Whey'), 
			 (SELECT name from animal_type where name = 'Large Pig')),
			((SELECT id from feed where name = 'Whey'), 
			 (SELECT name from animal_type where name = 'Dog')),
			((SELECT id from feed where name = 'Whey'), 
			 (SELECT name from animal_type where name = 'Cat')),
			((SELECT id from feed where name = 'Dog Food'), 
			 (SELECT name from animal_type where name = 'Dog')),
			((SELECT id from feed where name = 'Cat Food'), 
			 (SELECT name from animal_type where name = 'Cat')),
			((SELECT id from feed where name = 'Vegetable Fodder'), 
			 (SELECT name from animal_type where name = 'Rooster')),
			((SELECT id from feed where name = 'Organic Chicken Seed'), 
			 (SELECT name from animal_type where name = 'Rooster')),
			((SELECT id from feed where name = 'Organic Chicken Seed'), 
			 (SELECT name from animal_type where name = 'Hen')),
			((SELECT id from feed where name = "Earl's Organic Livestock Grain Mix"), 
			 (SELECT name from animal_type where name = 'Cow'));
			 
-- PLANT_TYPE TABLE INSERTIONS --
INSERT INTO plant_type (name, growing_season)
	VALUES  ('Green Cabbage', 'Fall'),
		    ('Potato', 'Fall'),
			('Watermelon', 'Summer'),
			('Pumpkin', 'Fall'),
			('Butterhead Lettuce', 'Spring'),
			('Purple Cabbage', 'Summer'),
			('Tomato', 'Spring'),
			('Cantelope', 'Summer'),
			('Radish', 'Fall'),
			('Carrot', 'Fall'),
			('Indoor Tomato', 'Winter');
			
-- PLANT TABLE INSERTIONS --			
INSERT INTO plant (plot, date_planted, harvest_date, type)
	VALUES  (71, '2016-08-09', '2016-10-19', 'Green Cabbage'),
		    (71, '2016-08-09', '2016-10-19', 'Green Cabbage'),
		    (81, '2016-08-09', '2016-10-19', 'Green Cabbage'),
			(81, '2016-08-09', '2016-10-19', 'Green Cabbage'),
			(31, '2016-08-09', '2016-10-21', 'Potato'),
			(31, '2016-08-09', '2016-10-21', 'Potato'),
			(41, '2016-08-09', '2016-10-21', 'Potato'),
			(41, '2016-08-09', '2016-10-21', 'Potato'),
			(71, '2017-03-27', '2017-07-13', 'Tomato'),
			(71, '2017-03-27', '2017-07-13', 'Tomato'),
			(81, '2017-03-27', '2017-07-13', 'Tomato'),
			(81, '2017-03-27', '2017-07-13', 'Tomato'),
			(231, '2018-05-05', '2015-07-29', 'Cantelope'),
			(231, '2018-05-05', '2015-07-29', 'Cantelope'),
			(231, '2018-05-05', '2015-07-29', 'Cantelope'),
			(231, '2018-05-05', '2015-07-29', 'Cantelope');

-- PLANT_MANURE TABLE INSERTIONS --
INSERT INTO plant_manure (plant_name, manure_type)
	VALUES  ((SELECT name from plant_type where name = 'Green Cabbage'), 
			 (SELECT name from animal_type where name = 'Cow')),
		    ((SELECT name from plant_type where name = 'Green Cabbage'), 
			 (SELECT name from animal_type where name = 'Pig')),
			((SELECT name from plant_type where name = 'Cantelope'), 
			 (SELECT name from animal_type where name = 'Small Cow')),
			((SELECT name from plant_type where name = 'Radish'), 
			 (SELECT name from animal_type where name = 'Large Pig'));	 
	
-- Works Referenced
-- -- https://stackoverflow.com/questions/25422573/how-to-restrict-the-length-of-integer-when-creating-a-table-in-sql-server
-- -- https://www.experts-exchange.com/questions/28469361/mySQL-How-to-check-if-string-is-Numeric.html