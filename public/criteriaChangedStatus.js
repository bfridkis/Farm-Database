//Function that tracks whether inputs have changed between filtering and adding.
//If input values have not changed since last filter and the user adds (i.e. inputs
//duplicate rows), the table will remain filtered. Filter criteria are stored in hidden
//inputs on the page with ids suffixed by 'FilterCriteriaCache'. These values are compared
//to inputs after user interaction (i.e. on next insert request) and a flag is sent back
//to the server accordingly.
function criteriaChangedStatus(){
	var updateButton = document.getElementById("Add Instance");
	updateButton.addEventListener("click", function(){
		var criteriaChangedFlag = document.getElementById('~filterCriteriaChangedFlag');
		var filterCriteriaCache = document.getElementsByClassName("filterCriteriaCache");
		for(var i = 0; i < filterCriteriaCache.length; i++){
			var fieldValue = document.getElementById(filterCriteriaCache[i].getAttribute("id")
				.substring(0, filterCriteriaCache[i].getAttribute("id").length - 19));
			if(filterCriteriaCache[i].getAttribute("value") !== fieldValue.value){
				criteriaChangedFlag.value = "true";
				break;
			}
		}
	});
}