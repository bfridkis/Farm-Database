/*****************************************************************
** Benjamin Fridkis
** Main - Final Project
** CS340 - INTRODUCTION TO DATABASES
** ---------------------------------------------------------------
** This is the main program for the Final Project, which I
** call "Farm" database. This program sets up the server (which
** runs Node) using the Node package 'express' with various
** modules and definitions. The program utilizes routes for
** for organizing each table into its own section. The 
** organization used to interact with each table entails a 
** a route and two "views" or "handlebars", which can be found
** in its own folder under its specific table name. (The js
** file folders are in the same directory as this file, while
** the handlebar folders are in the views directory). Each table
** and the components required for its interaction employ 
** essentially the same structures and principles. Therefore, you
** will only find notes on the 'animal.js' file, but be aware that
** the other route handlers function essesntially the same way.
** There are 3 helper modules you will also find in the home
** directory: makeSQL.js, selectTable.js, and selectTables.js.
** Each of these provides some introductory notation. Additionally,
** several helper functions are also found in the public folder,
** namely used for styling, pre-populating data fields, and input
** validation.
*******************************************************************/
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var mysql = require('./dbcon.js');
var selectTables = require('./selectTables.js');
var makeSQL = require('./makeSQL.js');
var selectTable = require('./selectTable.js');
var createTablesSQL = require('./createTablesSQL.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 5000);
app.set('mysql', mysql);
app.set('selectTables', selectTables);
app.set('makeSQL', makeSQL);
app.set('selectTable', selectTable);

app.get('/reset-tables', function(req, res, next){
	mysql.pool.query(createTablesSQL(), 
		function(err, rows, fields){
			if(err){
				res.write(JSON.stringify(err));
				res.end();
			}
			else{
				res.redirect('/');
			}
		});
});

app.get('/', function(req,res,next){
	context = {};
	context.jsscriptsHomePage = ['tableSelect.js'];
	context.css = ["style.css", "homePageStyle.css"];
	res.render('home', context)
});

app.use('/animalTable', require('./Animal/animal.js'));
app.use('/animalFeedTable', require('./Animal_Feed/animalFeed.js'));
app.use('/animalTypeTable', require('./Animal_Type/animalType.js'));
app.use('/buildingTable', require('./Building/building.js'));
app.use('/employeeTable', require('./Employee/employee.js'));
app.use('/employeePlotTable', require('./Employee_Plot/employeePlot.js'));
app.use('/equipmentTable', require('./Equipment/equipment.js'));
app.use('/feedTable', require('./Feed/feed.js'));
app.use('/plantTable', require('./Plant/plant.js'));
app.use('/plantManureTable', require('./Plant_Manure/plantManure.js'));
app.use('/plantTypeTable', require('./Plant_Type/plantType.js'));
app.use('/plotTable', require('./Plot/plot.js'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on flip2.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
	
