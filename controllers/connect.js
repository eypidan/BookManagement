const mysql = require('mysql');

let connection = mysql.createConnection({
	host:'10.79.25.117',
	user:'3170105750',
	password:'123456',
	database:'book_management'
});

function connect_database(query){

	
	return new Promise(function (resolve, reject) {
		connection.query(query, function (error, results, fields) {
			
			if (error) return reject(error);
			// console.log(fields);
			resolve(results);		
		});
	  });
}

function addmultiple_data(query,data){
	
	var values = [];
	data.forEach(function(n, i){
		var _arr = [];
		for(var m in n){
			_arr.push(n[m]);
		}
		values.push(_arr);
	})
	// connection.connect();
	return new Promise(function (resolve, reject) {
		connection.query(
			query,
			[values],
			function (error, results, fields) {
				// connection.end();
				if (error) return reject(error);
				// console.log(fields);
				resolve(results);		
			}
		);
	  });
}
function endconnect(){
	connection.end();
}
module.exports ={
	easy_query:connect_database,
	addmultiple_book:addmultiple_data,
	end:endconnect
};