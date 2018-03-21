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
			selectTable(req, res, mysql, context, 'Plant_Manure', ['Plant_Manure',
																   'Plant_Type',
																   'Animal_Type'],
																    filterCache);
		}
		else{
			selectTable(req, res, mysql, context, 'Plant_Manure', ['Plant_Manure',
																   'Plant_Type',
																   'Animal_Type']);
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
			selectTable(req, res, mysql, context, 'Plant_Manure', ['Plant_Manure',
																   'Plant_Type',
																   'Animal_Type']);
		}
		
		else if(req.body["Add Instance"]){
			var sql = makeSQL('INSERT', 'plant_manure', req);
			sql = mysql.pool.query(sql.query,sql.values,function(error, results, fields){
				if(error){
					res.write(JSON.stringify(error));
					res.end();
				}
				else{
					var context = {};
					if(req.body["~filterCriteriaChangedFlag"] === "true"){	
						filterCache = [];
					selectTable(req, res, mysql, context, 'Plant_Manure', ['Plant_Manure',
																		   'Plant_Type',
																		   'Animal_Type']);
					}
					else{
						context.formFill = [];
						for(var key in req.body){ 
							if(key !== 'tableViewRequest' && key !== 'reset'
								&& key !== 'canceled' && key !== 'Filter Table' && key.charAt(0) !== '~'){
								context.formFill.push({key : key, value : req.body[key]});
							}
						}
						selectTable(req, res, mysql, context, 'Plant_Manure', ['Plant_Manure',
																			   'Plant_Type',
																			   'Animal_Type'],
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
						  {plant_name : req.body.plant_name, 
						   manure_type : req.body.manure_type}];
			selectTable(req, res, mysql, context, 'Plant_Manure', ['Plant_Manure',
																   'Plant_Manure',
																   'Plant_Type',
																   'Animal_Type'],
																    filterCache,
																	[true, false]);
		}
	});
		
	router.get('/:primaryKey', function(req, res){
		filterCache = [];
		var context = {};
		var callbackCount = 0;
		var mysql = req.app.get('mysql');
		var selectTables = req.app.get('selectTables');
		var filters = req.params.primaryKey.split('~');
		selectTables(res, mysql, context, complete, ['Plant_Manure'], null, [true]);
		selectTables(res, mysql, context, complete, ['Plant_Manure',
													 'Plant_Type',
													 'Animal_Type'], 
													[{manure_type : filters[0],
													  plant_name : filters[1]}]);
		context.id = req.params.id;
		context.title = 'Update Plant_Manure';
		context.css = ['../style.css'];
		context.jsscriptsUpdate = ['../attributeSelected.js', '../updateRow.js', '../uniqueValidator.js'];
		function complete(){
			callbackCount++;
			if(callbackCount >= 4){
				res.render('Plant_Manure/Plant_ManureUpdate', context);
			}
		}
	});
	
	router.put('/:primaryKey', function(req, res){
		var mysql = req.app.get('mysql');
		var makeSQL = req.app.get('makeSQL');
		var sql = makeSQL('UPDATE', 'plant_manure', req);console.log(sql);//********************
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
	
	router.delete('/:primaryKey', function(req, res){
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM plant_manure WHERE manure_type=? AND plant_name=?";
		var inserts = req.params.primaryKey.split('~'); console.log(sql, inserts);//********************
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