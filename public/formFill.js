//Function to pre-poluate input fields after user has
//filtered the table, so filter criteria (i.e. input values)
//are not lost when the user clicks "Filter Table".
function formFill(fieldName, fieldValue){
	var field = document.getElementById(fieldName);
	field.value = fieldValue;
}
