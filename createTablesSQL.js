module.exports = function(){  
	var createTablesSQLStatement = String("DROP TABLE IF EXISTS `employee_plot`;DROP TABLE IF EXISTS `equipment`;"); 

	return createTablesSQLStatement;
}