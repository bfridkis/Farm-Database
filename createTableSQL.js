module.exports = function(){
  var createTablesSQLStatement = "CREATE TABLE plot ( id int(11) NOT NULL AUTO_INCREMENT, type ENUM('Pasture', 'Nightshade', 'Legume','Brassica', 'Root Vegetable','Woodland', 'Spring Wheat', 'Winter Wheat', 'Oats', 'Fruit') NOT NULL,cycle_status int(1) NOT NULL check (Cycle_Status between 0 and 5),previous_type ENUM('Pasture', 'Nightshade', 'Legume', 'Brassica', 'Root Vegetable', 'Woodland', 'Spring Wheat', 'Winter Wheat', 'Oats', 'Fruit', 'N/A'),PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;"

   return createTablesSQLStatement;
}