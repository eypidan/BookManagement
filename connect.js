const mysql = require('mysql');
let connection = mysql.createConnection({
    host:'10.79.25.117',
    user:'3170105750',
    password:'123456',
    database:'book_management'
});

function connect_database(query){
    connection.connect(function(err) {
        if (err) {
          console.error('wrong password');
          return;
        }
      });
    
    connection.query(query, function (error, results, fields) {
      if (error) throw error;
      console.log(results);
    });
    connection.end();
}
module.exports ={
  query :connect_database,
};