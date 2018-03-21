var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_fridkisb',
  password        : '0627',
  database        : 'cs340_fridkisb'
});

module.exports.pool = pool;