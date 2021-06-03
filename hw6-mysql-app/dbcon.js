var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'mysql.eecs.oregonstate.edu',
  user            : 'cs290_wagnersp',
  password        : '8246',
  database        : 'cs290_wagnersp'
});

module.exports.pool = pool;

