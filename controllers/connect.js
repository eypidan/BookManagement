const mysql = require('mysql');



function connect_database(query){
	let connection = mysql.createConnection({
		host:'10.79.25.117',
		user:'3170105750',
		password:'123456',
		database:'book_management'
	});
	let x;

	
	return new Promise(function (resolve, reject) {
		connection.query(query, function (error, results, fields) {
			if (error) return reject(error);
			// console.log(fields);
			resolve(results);		
		});
	  });
}


module.exports =connect_database;