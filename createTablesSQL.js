module.exports = function(){  
	var createTablesSQLStatement = String("DROP TABLE IF EXISTS `employee_plot`;DROP TABLE IF EXISTS `equipment`;DROP TABLE IF EXISTS `building`;DROP TABLE IF EXISTS `employee`;DROP TABLE IF EXISTS `animal_feed`;DROP TABLE IF EXISTS `feed`;DROP TABLE IF EXISTS `animal`;DROP TABLE IF EXISTS `plant_manure`;DROP TABLE IF EXISTS `animal_type`;DROP TABLE IF EXISTS `plant`;DROP TABLE IF EXISTS `plant_type`;DROP TABLE IF EXISTS `plot`;"); 

	return createTablesSQLStatement;
}