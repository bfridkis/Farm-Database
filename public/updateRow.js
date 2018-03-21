//Function to send AJAX request (PUT request) for updating a row. Optional parameters 
//dateInputValidator, numericInputValidator, and uniqueValidator are functions to 
//perform input validation before the request is sent. If entry violates a data constraint,
//the user is alerted accordingly and the request is not sent.
function updateRow(primaryKey, entity, dateInputValidator, numericInputValidator, uniqueValidator){
	var updateButton = document.getElementById("updateButton");
	updateButton.addEventListener("click", function(){
		var notNullInputs = document.getElementsByClassName("notNull");
		var notNullsNotNull = true;
		var notNullsLeftNull = [];
		for(var i = 0; i < notNullInputs.length; i++){
			if(notNullInputs[i].value === '' || notNullInputs[i].value.toUpperCase() === 'NULL'){
				notNullsNotNull = false;
				notNullsLeftNull.push(notNullInputs[i]);
			}
		}
		var selectors = document.getElementsByTagName("select");
		var selectorSetToAll = false;
		for(var i = 0; i < selectors.length; i++){
			if(selectors[i].value === 'all'){
				selectorSetToAll = true;
			}
		}
		var dateValidated = true;
		if(dateInputValidator){
			dateValidated = dateInputValidator();
		}
		var numericValidated = true;
		if(numericInputValidator){
			numericValidated = numericInputValidator()();
		}
		var uniqueValidated = true;
		if(uniqueValidator){
			uniqueValidated = uniqueValidator();
		}
		if(!notNullsNotNull || selectorSetToAll || !dateValidated || !numericValidated || !uniqueValidated){
			notNullsLeftNull.forEach(function(notNullLeftNull){
				var fieldName = notNullLeftNull.getAttribute("name");
					fieldName = fieldName.charAt(0).toUpperCase() + fieldName.substring(1);
					alert(fieldName + " cannot be left null.");
			});
			if(selectorSetToAll){
				alert("Cannot update instance with attribute '*'");
			}
			event.preventDefault();
		}
		else{
			var selector = '#update' + entity;
			var windowToReplace = '/' + entity.charAt(0).toLowerCase() + 
								   entity.substring(1) + 'Table';
			$.ajax({
				url: primaryKey,
				type: 'PUT',
				data: $(selector).serialize(),
				success: function(result){
					console.log('success');
					window.location.replace(windowToReplace);
				}
			});
		}
	});
};