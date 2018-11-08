/*****************************************************************
** Benjamin Fridkis
** Main - Final Project
** CS340 - INTRODUCTION TO DATABASES
** ---------------------------------------------------------------
** This is the route to handle interaction with the Animal table.
** As mentioned in the notes for the main program (FarmDatabase-
** FinalProject-CS340Main.js), all tables use this same route 
** structure. See below for additional explanation.
** --------------------------------------------------------------
** ADDITIONAL NOTE: One area of added complexity not covered here
** is input validation for unique fields (as this table has no 
** unique fields that can be manipulated by users). Tables that do
** have such inputs are as follows: Animal_Feed, Animal_Type, 
** Employee, Employee_Plot, Plant_Manure, and Plant_Type. In 
** essence, the only difference with these table routes and views
** is that a second copy of the entire table must be provided for
** both viewing (specifically when filtering) and updating, so a
** check of the entire table can be made against user-input values
** to make sure an attempt to create a duplicate is not made (and 
** hence to avoid providing the sql error directly to the user). 
** The second copy of the table is rendered via the table and update
** handlebars with its style attribute of display set to none.
*******************************************************************/
module.exports = function(){
    var express = require('express');
    var router = express.Router();
	var app = express();
	var filterCache = [];
	
	//Handles GET requests to table page. Redirected here after updates
	//and deletes.
	router.get('/', function(req, res){
		var mysql = req.app.get('mysql');
		var selectTable = req.app.get('selectTable');
		var context = {};
		context.formFill = []; 
		//filter cache is a means by which the table filter remains in place
		//after deletes. It will also remain after insertions if duplicates are added
		//(i.e. none of the form fields change between a filter and insertion operation).
		if(filterCache.length > 0){
			filterCache.forEach(function(filterList){
				for(var key in filterList){
					if(key !== 'tableViewRequest' && key !== 'reset'
						&& key !== 'canceled' && key !== 'Filter Table' && key.charAt(0) !== '~'){
						context.formFill.push({key : key, value : filterList[key]});
					}
				}
			});
			selectTable(req, res, mysql, context, 'Animal', ['Animal',
															 'Animal_Type',
															 'Plot'],
															 filterCache);
		}
		else{
			selectTable(req, res, mysql, context, 'Animal', ['Animal',
															 'Animal_Type',
															 'Plot']);
		}
	});
	
	//POST request handler. Handles table view, adding, canceling updates,
	//and filtering.
    router.post('/', function(req, res){
		var mysql = req.app.get('mysql');
		var makeSQL = req.app.get('makeSQL');
		var selectTable = req.app.get('selectTable');
		if(req.body["Home Page"]){
			res.redirect('/');
		}
		
		else if(req.body["canceled"] || req.body["tableViewRequest"] || req.body["reset"]){
			filterCache = [];
			var context = {}
			selectTable(req, res, mysql, context, 'Animal', ['Animal',
															 'Animal_Type',
															 'Plot']);
		}
		
		else if(req.body["Add Instance"]){
			var sql = makeSQL('INSERT', 'animal', req);
			sql = mysql.pool.query(sql.query,sql.values,function(error, results, fields){
				if(error){
					res.write(JSON.stringify(error));
					res.end();
				}
				else{
					var context = {};
					//As mentioned above in the GET request handler notes, the
					//filter criteria will be maintained if an instance is added
					//after filtering and the filter criteria haven't been changed.
					//A static javascript function (see criteriaChangedStatus.js)
					//manages sending back a flag to indicate if the criteria have
					//changed.
					if(req.body["~filterCriteriaChangedFlag"] === "true"){	
						filterCache = [];
					selectTable(req, res, mysql, context, 'Animal', ['Animal',
																	 'Animal_Type',
																	 'Plot']);
					}
					else{
						context.formFill = [];
						for(var key in req.body){ 
							if(key !== 'tableViewRequest' && key !== 'reset'
								&& key !== 'canceled' && key !== 'Filter Table' && key.charAt(0) !== '~'){
								context.formFill.push({key : key, value : req.body[key]});
							}
						}
						selectTable(req, res, mysql, context, 'Animal', ['Animal',
																		 'Animal_Type',
																		 'Plot'],
																		 filterCache);
					}
				}	
			});
		}
		else if(req.body["Filter Table"]){
			var context = {};
			context.formFill = [];
			for(var key in req.body){
				if(key !== 'tableViewRequest' && key !== 'reset'
					&& key !== 'canceled' && key !== 'Filter Table' && key.charAt(0) !== '~'){
						context.formFill.push({key : key, value : req.body[key]});
					}
			}
			filterCache = [{type : req.body.type, 
							plot : req.body.plot,
							slaughter_date : req.body.slaughter_date,
							dob_or_doa : req.body.dob_or_doa}];
			selectTable(req, res, mysql, context, 'Animal', ['Animal',
															 'Animal_Type',
															 'Plot'],
															filterCache);
		}
	});
	
	//GET request with primary key parameter sub-index. The update links
	//on the main table view are each embedded with their specific row's
	//primary key, which then sends the request here. The primary key is
	//provided to selectTables to filter out all other rows. (Note selectTable
	//is not used here because the update page does not render a complete table 
	//as such.) Renders update page and provides filtered table data to pre-populate
	//update fields with existing data.
	router.get('/:id', function(req, res){
		filterCache = [];
		var context = {};
		var callbackCount = 0;
		var mysql = req.app.get('mysql');
		var selectTables = req.app.get('selectTables');
		selectTables(res, mysql, context, complete, ['Animal',
													 'Animal_Type',
													 'Plot'], 
													[{id : req.params.id}]);
		context.id = req.params.id;
		context.title = 'Update Animal';
		context.css = ['../style.css'];
		context.jsscriptsUpdate = ['../attributeSelected.js', '../updateRow.js', '../resetForm.js',
									'../dateInputValidator.js'];
		function complete(){
			callbackCount++;
			if(callbackCount >= 3){
				res.render('Animal/AnimalUpdate', context);
			}
		}
	});
	
	//Put requests are submitted via javascript "AJAX" or HTTP requests.
	//These manage updating rows according to the user provided inputs.
	//(User is redirected back to table view via a GET request.)
	router.put('/:id', function(req, res){
		var mysql = req.app.get('mysql');
		var makeSQL = req.app.get('makeSQL');
		var sql = makeSQL('UPDATE', 'animal', req);
		sql = mysql.pool.query(sql.query,sql.values,function(error, results, fields){
			if(error){
				res.write(JSON.stringify(error));
				res.end();
			}
			else{
				res.status(200);
				res.end();
			}
		});
	});
	
	//Delete requests are also submitted via javascript "AJAX" or HTTP requests.
	//(User is redirected back to table view via a GET request.)
	router.delete('/:id', function(req, res){
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM animal WHERE id=?";
		var inserts = [req.params.id];
		sql = mysql.pool.query(sql, inserts, function(error, results, fields){
			if(error){
				res.write(JSON.stringify(error));
				res.status(400);
				res.end();
			}
			else{
				res.status(202).end();
			}
		});
	});
	
	return router;
}();
