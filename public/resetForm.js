//Function to reset the input fields when the user clicks the "Reset" button.
function resetForm(){
	var resetButton = document.getElementsByClassName("reset")[0];
	resetButton.addEventListener("click", function(){
		var inputs = document.getElementsByClassName("resettableInput");
		for(var i = 0; i < inputs.length; i++){
			inputs[i].value = '';
		}
		var selects = document.getElementsByClassName("resettableSelector");
		if(resetButton.getAttribute("name") === "reset"){
			for(var i = 0; i < selects.length; i++){
				selects[i].value = 'all';
			}
		}
		if(resetButton.getAttribute("name") !== "reset"){
			event.preventDefault();
		}
	});
}