let mysql = require('mysql');
let connection = mysql.createConnection({
    host:'10.79.25.117',
    user:'3170105750',
    password:'123456',
    database:'book_management'
});
connection.connect(function(err) {
    if (err) {
      console.error('wrong password');
      return;
    }
    //console.log(connection);
    console.log('connected as id ' + connection.threadId);
  });

connection.query('show tables;', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});

connection.end();