//Function to center any table cells with null
//contents.
var tableCells = document.getElementsByTagName("td");
for (var i = 0; i < tableCells.length; i++){
	if(tableCells[i].textContent === 'null'){
		tableCells[i].style.textAlign = 'center';
	}
}