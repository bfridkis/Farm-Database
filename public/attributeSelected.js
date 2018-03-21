//Function to pre-populate selectors with values of existing
//row data on update page.
function attributeSelected(attribute, selected){
	var selector = document.getElementById(attribute);
	if(selected === null){
		selector.value = 'null';
	}
	else{
		selector.value = selected;
	}
};