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
			selectTable(req, res, mysql, context, 'Animal_Type', ['Animal_Type'],
																  filterCache);
		}
		else{
			selectTable(req, res, mysql, context, 'Animal_Type', ['Animal_type']);
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
			selectTable(req, res, mysql, context, 'Animal_Type', ['Animal_Type']);
		}
		
		else if(req.body["Add Instance"]){
			var sql = makeSQL('INSERT', 'animal_type', req);
			sql = mysql.pool.query(sql.query,sql.values,function(error, results, fields){
				if(error){
					res.write(JSON.stringify(error));
					res.end();
				}
				else{
					var context = {};
					if(req.body["~filterCriteriaChangedFlag"] === "true"){	
						filterCache = [];
					selectTable(req, res, mysql, context, 'Animal_Type', ['Animal_Type']);
					}
					else{
						context.formFill = [];
						for(var key in req.body){ 
							if(key !== 'tableViewRequest' && key !== 'reset'
								&& key !== 'canceled' && key !== 'Filter Table' && key.charAt(0) !== '~'){
								context.formFill.push({key : key, value : req.body[key]});
							}
						}
						selectTable(req, res, mysql, context, 'Animal_Type', ['Animal_Type'],
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
						  {name : req.body.name, 
						   size : req.body.size}];
			selectTable(req, res, mysql, context, 'Animal_Type', ['Animal_Type',
																  'Animal_Type'],
																  filterCache,
																  [true, false]);												  
		}
	});
		
	router.get('/:name', function(req, res){
		filterCache = [];
		var context = {};
		var callbackCount = 0;
		var mysql = req.app.get('mysql');
		var selectTables = req.app.get('selectTables');
		selectTables(res, mysql, context, complete, ['Animal_Type'], null, [true]);
		selectTables(res, mysql, context, complete, ['Animal_Type'], 
													[{name : req.params.name}]);
		context.id = req.params.id;
		context.title = 'Update Animal_Type';
		context.css = ['../style.css'];
		context.jsscriptsUpdate = ['../attributeSelected.js', '../updateRow.js', '../resetForm.js', 
								   '../uniqueValidator.js'];
		function complete(){
			callbackCount++;
			if(callbackCount >= 2){
				res.render('Animal_Type/Animal_TypeUpdate', context);
			}
		}
	});
	
	router.put('/:name', function(req, res){
		var mysql = req.app.get('mysql');
		var makeSQL = req.app.get('makeSQL');
		var sql = makeSQL('UPDATE', 'animal_type', req);
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
	
	router.delete('/:name', function(req, res){
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM animal_type WHERE name=?";
		var inserts = [req.params.name];
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