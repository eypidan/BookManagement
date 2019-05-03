const mysql = require('mysql');



function connect_database(query){
	let connection = mysql.createConnection({
		host:'10.79.25.117',
		user:'3170105750',
		password:'123456',
		database:'book_management'
	});
	let x;

	connection.connect();
	return new Promise(function (resolve, reject) {
		connection.query(query, function (error, results, fields) {
			connection.end();
			if (error) return reject(error);
			// console.log(fields);
			resolve(results);		
		});
	  });
}

function addmultiple_data(data){
	let connection = mysql.createConnection({
		host:'10.79.25.117',
		user:'3170105750',
		password:'123456',
		database:'book_management'
	});
	let x;
	
	var values = [];
	data.forEach(function(n, i){
		var _arr = [];
		for(var m in n){
			_arr.push(n[m]);
		}
		values.push(_arr);
	})
	console.log(values)
	// connection.connect();
	// return new Promise(function (resolve, reject) {
	// 	connection.query(
	// 		'insert into book (type,bookname,publisher,year,author,price) values ?',
	// 		[values],
	// 		function (error, results, fields) {
	// 			connection.end();
	// 			if (error) return reject(error);
	// 			// console.log(fields);
	// 			resolve(results);		
	// 		}
	// 	);
	//   });
}

module.exports ={
	easy_query:connect_database,
	addmultiple_book:addmultiple_data
};