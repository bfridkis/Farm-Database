//Function to validate numeric inputs. Optional parameter updatePage is 
//a flag to indicate if the function is being called from the update view.
//If so, the function is returned without establishing an event listener.
//Optional parameter lengthSpecifications is an array with input names
//that need to be checked for a specific length (used for phone number on
//the employee page). If an invalid entry is made, an alert message notifies
//the user accordingly.
function numericInputValidator(updatePage, lengthSpecifications){
	if(updatePage){
		return numericInputValidate.bind(null, lengthSpecifications);
	}
	else{
		
		var addInstance = document.getElementById("Add Instance");
		var updateInstance = document.getElementById("updateButton");
		if(addInstance){
			addInstance.addEventListener("click", numericInputValidate.bind(null, lengthSpecifications));
		}
		else{
			updateButton.addEventListener("click", numericInputValidate.bind(null, lengthSpecifications));
		}
	}
	
	function numericInputValidate(lengthSpecifications){
		var numericInputs = document.getElementsByClassName("numeric");
		var numericsNumericAndGreaterThan0 = true;
		var numericsNotNumericOrLessThan0 = [];
		for(var i = 0; i < numericInputs.length; i++){
			if(!$.isNumeric(numericInputs[i].value) && numericInputs[i].value.toUpperCase() !== 'NULL'
				&& numericInputs[i].value.toUpperCase() !== ''){
				numericsNumericAndGreaterThan0 = false;
				numericsNotNumericOrLessThan0.push(numericInputs[i]);
			}
			else if(numericInputs[i].value.charAt(0) === '-'){
				numericsNumericAndGreaterThan0 = false;
				numericsNotNumericOrLessThan0.push(numericInputs[i]);	
			}
		}
		if(!numericsNumericAndGreaterThan0){
			numericsNotNumericOrLessThan0.forEach(function(numericNotNumericOrLessThan0){
				var fieldName = numericNotNumericOrLessThan0.getAttribute("name");
				fieldName = fieldName.charAt(0).toUpperCase() + fieldName.substring(1);
				alert(fieldName + " must be numeric and greater than 0.");
			});
			event.preventDefault();
		}
		var inputAtSpecifiedLength = true;
		if(lengthSpecifications){
			lengthSpecifications.forEach(function(lengthSpecification){
				for(var key in lengthSpecification){
					var inputLength = document.getElementById(key).value.length;
					if(inputLength !== lengthSpecification[key]){
						alert(key.split('_').join(' ').charAt(0).toUpperCase() + 
							  key.split('_').join(' ').substring(1) +
							  " must be " + lengthSpecification[key] + " digits.");
						inputAtSpecifiedLength = false;	  
						event.preventDefault();
					}
				}
			});
		}
		return numericsNumericAndGreaterThan0 && inputAtSpecifiedLength;
	}
}