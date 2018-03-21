//Function to check for a unique constraint violation and alert the user accordingly.
//Checks a hidden table with all existing rows for a row with the same value as the user's
//input for the fields specified in the uniqueFields parameter. Optional parameter
//currentRowValues will contain the values of the current row the user is modifying when
//updating, so the updated row can return to its original values if the user chooses (as
//this of course will not violate the constraint).
function uniqueValidator(uniqueFields, currentRowValues){
	var isUnique = true;
	for(var i = 0; i < uniqueFields.length && isUnique; i++){
		if(typeof(uniqueFields[i]) === 'object'){
			var concatenatedKey = '';
			var concatenatedKeyName = '';
			uniqueFields[i].forEach(function(attribute){
				concatenatedKey += document.getElementById(attribute).value;
				concatenatedKeyName += attribute + ' ';
			});
			concatenatedKeyName = concatenatedKeyName.substring(0, concatenatedKeyName.length - 1);
			var rowCount = document.getElementsByClassName(uniqueFields[i][0] + "RowDataUnique").length;
			for(var j = 0; j < rowCount && isUnique; j++){
				var concatenatedKeyOfRow = '';
				uniqueFields[i].forEach(function(attribute){
					concatenatedKeyOfRow += document.getElementsByClassName(attribute + "RowDataUnique")[j].textContent + ' ';
				});
				concatenatedKeyOfRow = concatenatedKeyOfRow.substring(0, concatenatedKeyOfRow.length - 1);
				if(!currentRowValues && concatenatedKey.toUpperCase().replace(/ /g, '') === 
											concatenatedKeyOfRow.toUpperCase().replace(/ /g, '')){
					isUnique = false;
					alert("The combination of '" + concatenatedKeyName + "' must be unique.\nAnother row "
						+ "has already been assigned those values.");
				}
				else if(concatenatedKey.toUpperCase().replace(/ /g, '') ===
							concatenatedKeyOfRow.toUpperCase().replace(/ /g, '') &&
						currentRowValues[i].toUpperCase().replace(/ /g, '') !== 
							concatenatedKeyOfRow.toUpperCase().replace(/ /g, '')){
					isUnique = false;
					alert("The combination of '" + concatenatedKeyName + "' must be unique.\nAnother row "
					    + "has already been assigned those values.");
				}
			}
		}
		else{
			var key = document.getElementById(uniqueFields[i]).value;
			var rowCount = document.getElementsByClassName(uniqueFields[i] + "RowDataUnique").length;
			for(var j = 0; j < rowCount && isUnique; j++){
				var rowItemValue = document.getElementsByClassName(uniqueFields[i] + "RowDataUnique")[j].textContent;
				if(!currentRowValues && key.toUpperCase().replace(/ /g, '') === 
											rowItemValue.toUpperCase().replace(/ /g, '')){
					isUnique = false;
					alert(uniqueFields[i].charAt(0).toUpperCase() + 
						uniqueFields[i].substring(1, uniqueFields[i].length) + " must be unique. " +
						"Another row has already been assigned that " + uniqueFields[i] + ".");
				}
				else if(key.toUpperCase().replace(/ /g, '') === 
							rowItemValue.toUpperCase().replace(/ /g, '') && 
						key.toUpperCase().replace(/ /g, '') !== 
							currentRowValues[i].toUpperCase().replace(/ /g, '')){
							isUnique = false;
							alert(uniqueFields[i].charAt(0).toUpperCase() + 
							uniqueFields[i].substring(1, uniqueFields[i].length) + " must be unique. " + 
							"Another row has already been assigned that " + uniqueFields[i] + ".");
				}
			}
		}
	}
	return isUnique;
}
				