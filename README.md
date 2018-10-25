# Farm-Database
Database Web GUI w/Node Express

The database (along with its accompanying website) built for this project represents the holdings of a small farm. 
It tracks twelve relations, as follows: Animal, Animal_Feed, Animal_Type, Building, Employee, Employee_Plot, Equipment, 
Feed, Plant, Plant_Manure, and Plant_Type. Each of these relations allows the “farmer” to track specific information 
concerning the various kinds of property that is found on an agricultural holding. 
The website built for this site allows its user to access this data via table selects. The user can also filter this data 
via any combination of attributes used with an “AND” clause (i.e. the user can filter by any attributes in combination). 
(However, the user cannot filter using an “OR” filtering structure [e.g. cannot filter data that meets one criterion or another, 
but not both]). The user is also able to insert new data entries, update existing data entries, and delete existing data entries 
using the accompanying website. Update and delete operations are accomplished via AJAX requests. (The "PUT" request for updating
utilizes jQuery in its respective javascript, while the "DELETE" request for deleting does not.)  

The website uses static JavaScript to perform data validation against user entries, both for entries that may violate data 
type and formatting requirements, and entries that may violate database constraints (namely unique constraints). 
Node.js is the server platform used to run the website, and Express (w/Handlebars) is the library package that aids in the data handling 
processes and structure.

The app can be found hosted on Heroku via this link: http://farm-database.herokuapp.com/
