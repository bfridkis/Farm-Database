//Function to validate data format for date entries.
//(Note that inputs with type "date" were not used to allow
//the user to differentiate between "all" and "null" when filtering
//the table, since the same inputs are used for both filtering and 
//adding.)
function dateInputValidator(updatePage){
	if(!updatePage){
		var addInstance = document.getElementById("Add Instance");
		var updateInstance = document.getElementById("updateButton");
		if(addInstance){
			addInstance.addEventListener("click", dateInputValidate);
		}
		else{
			updateButton.addEventListener("click", dateInputValidate);
		}
	}
	else{
		return dateInputValidate;
	}
	
	function dateInputValidate(){
		var dateInputs = document.getElementsByClassName("date");
		var datesFormattedCorrectly = true;
		var datesFormattedIncorrectly = [];
		for(var i = 0; i < dateInputs.length; i++){
			if(dateInputs[i].value !== '' && dateInputs[i].value.toUpperCase() !== 'NULL' && 
			  (!$.isNumeric(dateInputs[i].value.substring(0, 4)) || dateInputs[i].value.charAt(4) !== '-' ||
			   !$.isNumeric(dateInputs[i].value.substring(5, 7)) || dateInputs[i].value.charAt(7) !== '-' ||
			   !$.isNumeric(dateInputs[i].value.substring(8)) || dateInputs[i].value.length !== 10)){
					datesFormattedCorrectly = false;
					datesFormattedIncorrectly.push(dateInputs[i]);
			}
		}
		if(!datesFormattedCorrectly){
			datesFormattedIncorrectly.forEach(function(dateNotFormattedCorrectly){
				var fieldName = dateNotFormattedCorrectly.getAttribute("name");
				fieldName = fieldName.charAt(0).toUpperCase() + fieldName.substring(1);
				alert(fieldName + " must be in YYYY-MM-DD format.");
			});
			event.preventDefault();
		}
		return datesFormattedCorrectly;
	}
}