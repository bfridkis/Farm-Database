module.exports = function(){
    var express = require('express');
    var router = express.Router();
	var app = express();
	var filterCache = [];

	router.get('/', function(req, res){
		var mysql = req.app.get('mysql');
		var selectTables = req.app.get('selectTables');
		var selectTable = req.app.get('selectTable');
		var context = {};
		context.formFill = []; 
		if(filterCache.length > 0){
			filterCache.forEach(function(filterList){
				for(var key in filterList){
					if(key !== 'tableViewRequest' && key !== 'reset'
						&& key !== 'canceled' && key !== 'Filter Table' && key.charAt(0) !== '~'){
						context.formFill.push({key : key, value : filterList[key]});
					}
				}
			});
			selectTable(req, res, mysql, context, 'Employee', ['Employee'],
															   filterCache);
		}
		else{
			selectTable(req, res, mysql, context, 'Employee', ['Employee']);
		}
	});
	
    router.post('/', function(req, res){
		var mysql = req.app.get('mysql');
		var selectTables = req.app.get('selectTables');
		var makeSQL = req.app.get('makeSQL');
		var selectTable = req.app.get('selectTable');
		if(req.body["Home Page"]){
			res.redirect('/');
		}
		
		else if(req.body["canceled"] || req.body["tableViewRequest"] || req.body["reset"]){
			filterCache = [];
			var context = {}
			selectTable(req, res, mysql, context, 'Employee', ['Employee']);
		}
		
		else if(req.body["Add Instance"]){
			var sql = makeSQL('INSERT', 'employee', req);
			sql = mysql.pool.query(sql.query,sql.values,function(error, results, fields){
				if(error){
					res.write(JSON.stringify(error));
					res.end();
				}
				else{
					var context = {};
					if(req.body["~filterCriteriaChangedFlag"] === "true"){	
						filterCache = [];
					selectTable(req, res, mysql, context, 'Employee', ['Employee']);
					}
					else{
						context.formFill = [];
						for(var key in req.body){ 
							if(key !== 'tableViewRequest' && key !== 'reset'
								&& key !== 'canceled' && key !== 'Filter Table' && key.charAt(0) !== '~'){
								context.formFill.push({key : key, value : req.body[key]});
							}
						}
						selectTable(req, res, mysql, context, 'Employee', ['Employee'],
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
			filterCache = [null,
						  {first_name : req.body.first_name, 
						   last_name : req.body.last_name,
						   dob : req.body.dob,
						   hourly_wage : req.body.hourly_wage,
						   phone_number : req.body.phone_number,
						   address : req.body.address}];
			selectTable(req, res, mysql, context, 'Employee', ['Employee',
															   'Employee'],
															   filterCache,
															   [true, false]);
		}
	});
		
	router.get('/:id', function(req, res){
		filterCache = [];
		var context = {};
		var callbackCount = 0;
		var mysql = req.app.get('mysql');
		var selectTables = req.app.get('selectTables');
		selectTables(res, mysql, context, complete, ['Employee'], null, [true]);
		selectTables(res, mysql, context, complete, ['Employee'], 
													[{id : req.params.id}]);
		context.id = req.params.id;
		context.title = 'Update Employee';
		context.css = ['../style.css'];
		context.jsscriptsUpdate = ['../attributeSelected.js', '../updateRow.js', '../resetForm.js', 
								   '../numericInputValidator.js', '../dateInputValidator.js', '../uniqueValidator.js'];
		function complete(){
			callbackCount++;
			if(callbackCount >= 2){console.log(context);
				res.render('Employee/EmployeeUpdate', context);
			}
		}
	});
	
	router.put('/:id', function(req, res){
		var mysql = req.app.get('mysql');
		var makeSQL = req.app.get('makeSQL');
		var sql = makeSQL('UPDATE', 'employee', req);
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
	
	router.delete('/:id', function(req, res){
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM employee WHERE id=?";
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