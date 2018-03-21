/*****************************************************************
** Benjamin Fridkis
** selectTables - Final Project
** CS340 - INTRODUCTION TO DATABASES
** ---------------------------------------------------------------
** This module populates the context object (which it receives as
** a parameter) that will be used by express to render pages 
** (handlebars) based on sql query responses. For each table
** specified in its tableNames array parameter, it will select data
** based on filter criteria (as provided in the filterCriteria 
** array). If no filter criteria is specified, selectTables will
** provide all rows of the specified table. Rows are stored in
** context under the name of the table followed by an s, whereas
** a single row (in the event of filtering by primary id) is 
** stored in context under the name of the table (singular). (Note
** that when filtering by a primary key, context will still be
** populated with a 'table name plural' array, which will also
** contain the same single row as context.[table name]. When
** filtering by multiple rows or not filtering, 
** context.[tablename] will contain the first row of the filtered
** or non-filtered result.
*******************************************************************/
module.exports = function(res, mysql, context, complete, tableNames, filterCriteria, uniqueCheckFlag){
					tableNames.forEach(function(tableName, i){
						var sql = 'Select * from ' + tableName.toLowerCase();
						var inserts = [];
						if(filterCriteria && filterCriteria[i]){
							sql += ' WHERE ';
							for(var key in filterCriteria[i]){
								if(filterCriteria[i][key] !== '' && filterCriteria[i][key] !== 'all'){
									if(filterCriteria[i][key].toUpperCase() === 'NULL'){
										sql += key + ' IS ' + null + ' AND ';
									}
									else{
										sql += key + ' =? AND ';
										inserts.push(filterCriteria[i][key]);
									}
								}
							}
							sql = sql.substring(0, sql.length - 5);
						}
						
						mysql.pool.query(sql, inserts, 
						function(err, rows, fields){
							if(err){
								res.write(JSON.stringify(err));
								res.end();
							}
							rows.forEach(function(row){
								for(var key in row){
									if(row[key] === null || row[key] === ''){
										row[key] = "null";
									}
									//This code reformats dates send back from express's
									//mysql object with the timestamp truncated.
									else if(typeof(row[key]) === 'object'){
										row[key] = new Date(row[key]);
										row[key] = row[key].toJSON();
										row[key] = String(row[key]).substring(0, 10);
									}
									else if(key === 'name' || key === 'first_name' ||
											key === 'last_name'){
										row[key] = row[key].charAt(0).toUpperCase() +
											row[key].substring(1);
									}
								};
							});
							context[tableName.toLowerCase() + 's'] = rows;
							context[tableName.toLowerCase()] = rows[0];
							if(uniqueCheckFlag && uniqueCheckFlag[i]){
								context[tableName.toLowerCase() + 'sUniqueCheckForUpdate'] = rows;
							}
							complete();
						});
					});
				 }