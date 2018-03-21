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
			selectTable(req, res, mysql, context, 'Animal_Feed', ['Animal_Feed',
																  'Animal_Type',
																  'Feed'],
																  filterCache);
		}
		else{
			selectTable(req, res, mysql, context, 'Animal_Feed', ['Animal_Feed',
																  'Animal_Type',
																  'Feed']);
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
			selectTable(req, res, mysql, context, 'Animal_Feed', ['Animal_Feed',
																  'Animal_Type',
																  'Feed']);
		}
		
		else if(req.body["Add Instance"]){
			var sql = makeSQL('INSERT', 'animal_feed', req);
			sql = mysql.pool.query(sql.query,sql.values,function(error, results, fields){
				if(error){
					res.write(JSON.stringify(error));
					res.end();
				}
				else{
					var context = {};
					if(req.body["~filterCriteriaChangedFlag"] === "true"){	
						filterCache = [];
					selectTable(req, res, mysql, context, 'Animal_Feed', ['Animal_Feed',
																		  'Animal_Type',
																		  'Feed']);
					}
					else{
						context.formFill = [];
						for(var key in req.body){ 
							if(key !== 'tableViewRequest' && key !== 'reset'
								&& key !== 'canceled' && key !== 'Filter Table' && key.charAt(0) !== '~'){
								context.formFill.push({key : key, value : req.body[key]});
							}
						}
						selectTable(req, res, mysql, context, 'Animal_Feed', ['Animal_Feed',
																			  'Animal_Type',
																			  'Feed'],
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
						  {feed_id : req.body.feed_id, 
						   animal_name : req.body.animal_name}];
			selectTable(req, res, mysql, context, 'Animal_Feed', ['Animal_Feed',
																  'Animal_Feed',
																  'Animal_Type',
																  'Feed'],
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
		selectTables(res, mysql, context, complete, ['Animal_Feed'], null, [true]);
		selectTables(res, mysql, context, complete, ['Animal_Feed',
													 'Animal_Type',
													 'Feed'], 
													[{feed_id : filters[0],
													  animal_name : filters[1]}]);
		context.id = req.params.id;
		context.title = 'Update Animal_Feed';
		context.css = ['../style.css'];
		context.jsscriptsUpdate = ['../attributeSelected.js', '../updateRow.js', '../uniqueValidator.js'];
		function complete(){
			callbackCount++;
			if(callbackCount >= 4){
				res.render('Animal_Feed/Animal_FeedUpdate', context);
			}
		}
	});
	
	router.put('/:primaryKey', function(req, res){
		var mysql = req.app.get('mysql');
		var makeSQL = req.app.get('makeSQL');
		var sql = makeSQL('UPDATE', 'animal_feed', req);
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
		var sql = "DELETE FROM animal_feed WHERE feed_id=? AND animal_name=?";
		var inserts = req.params.primaryKey.split('~');
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