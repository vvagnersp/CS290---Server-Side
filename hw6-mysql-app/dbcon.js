var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_wagnersp',
  password        : '8246',
  database        : 'cs290_wagnersp'
});

module.exports.pool = pool;


