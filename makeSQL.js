/********************************************************************
** Benjamin Fridkis
** makeSQL - Final Project
** CS340 - INTRODUCTION TO DATABASES
** ---------------------------------------------------------------
** This module provides a function that will receive an operation
** type specification (INSERT or UPDATE), a table name, and an 
** express request object, and will output a query with placeholders
** along with an array of inserts (in an object body). The function
** will disregard attributes with leading '~' characters, such that
** any key-value pairs of the request body that should not be
** included in the query and inserts should be prefaced with an '~'
** accordingly. Additionally, a value of '' (blank string) will 
** be ignored, while a value of 'null' (case insensitive) will be 
** converted from the string null to the javascript type null.
*********************************************************************/
module.exports = function(operationType, tableName, req){
			var inserts = [];
			var valuesString = "", valuesCounter = 0, valuesPlaceholderString = "";
			for (var attribute in req.body){
				if(operationType.toUpperCase() === 'INSERT' && req.body[attribute].toUpperCase() !== 'NULL' 
					&& req.body[attribute] !== '' && req.body[attribute] !== 'all' 
					&& attribute !== 'Add Instance' && attribute.charAt(0) !== '~'){
					valuesString += attribute + ',';
					valuesCounter++;
					inserts.push(req.body[attribute]);
				}
				else if(operationType.toUpperCase() === 'UPDATE' 
						&& attribute.charAt(0) !== '~'){
					valuesString += attribute + ',';
					valuesCounter++;
					inserts.push(req.body[attribute]);
				}

			}
			valuesString = valuesString.substring(0, valuesString.length - 1);
			for (var i = 0; i < valuesCounter; i++){
				valuesPlaceholderString += '?,';
				
			}
			valuesPlaceholderString = valuesPlaceholderString.substring(0, valuesPlaceholderString.length - 1);
			if(operationType.toUpperCase() === "INSERT"){
				var sql = "INSERT INTO " + tableName + " (" + valuesString + ") VALUES (" + valuesPlaceholderString + ")";
			}
			else if(operationType.toUpperCase() === "UPDATE"){
				var sql = "UPDATE " + tableName + " SET ";
				valuesString = valuesString.split(',');
				if(req.body.id){
					valuesString.forEach(function(attribute, attributeNumber){
						if(attributeNumber < valuesString.length - 1){
							sql += attribute + "=?,";
						}
					});
				}
				else{
					valuesString.forEach(function(attribute, attributeNumber){
						if(attributeNumber < valuesString.length){
							sql += attribute + "=?,";
						}
					});
				}
				sql = sql.substring(0, sql.length - 1);
				if(req.body.id){
					sql += " WHERE id=?";
				}
				else{
					sql += " WHERE ";
					for(var attribute in req.body){
						if(attribute.charAt(0) === '~'){
							if(req.body[attribute].toUpperCase() !== 'NULL' && 
								req.body[attribute] !== ''){
								sql += attribute.substring(1) + "=? AND ";
								inserts.push(req.body[attribute]);
							}
							else{
								sql += attribute.substring(1) + ' IS NULL AND ';
							}
						}
					}
					sql = sql.substring(0, sql.length - 5);
				}			
			}
			inserts.forEach(function(insert, i){
						if(typeof(insert) === 'string' && (insert.toUpperCase() === 'NULL' || insert === '')){
							inserts[i] = null;
						}
					});
			return {query: sql, values: inserts};
};
