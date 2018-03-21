/*******************************************************************
** Benjamin Fridkis
** selectTable - Final Project
** CS340 - INTRODUCTION TO DATABASES
** ---------------------------------------------------------------
** This module is a helper function for selectTables, as it 
** essentially manages tracking the number of sql query requests
** completed (which is based on the number of tables needed to 
** render a specific page). The name might be a little misleading,
** as it can select more than one table, but the intention behind
** the name is that its purpose is to provide all the data needed 
** to render a specific table to the user along with the associated
** form data. So for instance, to display the Animal table along
** with the form needed to add or filter its entities, data from
** Animal, Animal_Type, and Plot is needed (as the type and plot
** attributes of Animal are foreign key references to Animal_Type
** and Plot, respectively). So this funciton, using the selectTables
** module, manages these sql query requests and then renders the 
** final page with the necessary data. It takes express response
** and request objects, an express sql database connection object,
** an object into which response data will be stored,
** the name of the table to render, an array of table names 
** containing the names of each table needed, and optional agruments
** filterCriteria and uniqueCheckFlag, which are arrays with indexs
** corresponding to the indexes of tableNames (e.g. tableNames[0] 
** has filter criteria given by filterCriteria[0] and a unique-check
** indicator flag found at uniqueCheckFlag[0]. All of these besides
** the name of the table to render are passed to selectTables, and 
** will be explained in more detail in that module's source code.
*********************************************************************/
module.exports = function(req, res, mysql, context, tableToRender, tableNames, filterCriteria, uniqueCheckFlag){
	var selectTables = req.app.get('selectTables');
	var callbackCount = 0;
	selectTables(res, mysql, context, complete, tableNames, filterCriteria, uniqueCheckFlag);
	context.title = tableToRender + ' Table';
	context.css = ['style.css'];
	context.jsscriptsTableView = ['displayStyling.js', 'deleteRow.js', 'sendParameterAddOrFilter.js', 'formFill.js',
								  'resetForm.js', 'criteriaChangedStatus.js', 'numericInputValidator.js',
								  'dateInputValidator.js', 'uniqueValidator.js'];
	function complete(){
		callbackCount++;
		if(callbackCount >= tableNames.length){
			res.render(tableToRender + '/' + tableToRender + 'Table', context);
		}
	}
}