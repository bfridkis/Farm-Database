var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'mysql://bf57ae5b87d78d:3d33c6b9@us-cdbr-iron-east-05.cleardb.net/heroku_6ad1e967f6f86fb?reconnect=true',
  user            : 'bf57ae5b87d78d',
  password        : '3d33c6b9',
  database        : 'heroku_6ad1e967f6f86fb'
});

module.exports.pool = pool;