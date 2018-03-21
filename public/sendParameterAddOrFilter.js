//This function checks input fields for certain conditions based on class name.
//It checks inputs and selects with the class name notNull for empty fields or with
//the text 'null' (case insensitive) as their value. The optional parameter uniqueValidator
//is a function which checks the user's input against a hidden table to make sure the input
//will not violate a unique constraint. If invalid entries are attempted, alert messages
//notify the user accordingly.
function sendParameterAddOrFilter(uniqueValidator){
	var addInstance = document.getElementById("Add Instance");
	addInstance.addEventListener("click", function(){
		var selectors = document.getElementsByTagName("select");
		var selectorSetToAll = false;
		for(var i = 0; i < selectors.length; i++){
			if(selectors[i].value === 'all'){
				selectorSetToAll = true;
			}
		}
		var notNullInputs = document.getElementsByClassName("notNull");
		var notNullsNotNull = true;
		var notNullsLeftNull = [];
		for(var i = 0; i < notNullInputs.length; i++){
			if(notNullInputs[i].value === '' || notNullInputs[i].value.toUpperCase() === 'NULL'){
				notNullsNotNull = false;
				notNullsLeftNull.push(notNullInputs[i]);
			}
		}
		if(selectorSetToAll){
			alert("Cannot add instance with attribute '*'");
			event.preventDefault();
		}
		if(!notNullsNotNull){
			notNullsLeftNull.forEach(function(notNullLeftNull){
				var fieldName = notNullLeftNull.getAttribute("name");
				fieldName = fieldName.charAt(0).toUpperCase() + fieldName.substring(1);
				alert(fieldName + " cannot be left null.");
			});
			event.preventDefault();
		}
		var isUnique = true;
		if(uniqueValidator){
			var isUnique = uniqueValidator();
			if(!isUnique){
				event.preventDefault();
			}
		}
		if(!selectorSetToAll && notNullsNotNull && isUnique){
			addInstance.setAttribute("name", addInstance.getAttribute("value"));
		}
	});
	var filterTable = document.getElementById("Filter Table");
	filterTable.addEventListener("click", function(){
		filterTable.setAttribute("name", filterTable.getAttribute("value"));
	});
}