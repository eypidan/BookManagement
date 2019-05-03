const cont_db = require('./connect.js')
const token = "99fe4c836e3a229af9725e24955dfdb779e315e0"
var fn_signin = async (ctx,next) => {
    const id = ctx.request.body.id; 
	const password = ctx.request.body.password;

    const result = await cont_db('select * from admin');
	// console.log(id);
	const fail_response = {
		status:-1,   //fail,密码错误 或者 code错误
	}
	let sucess_response;
	let sucess = false;
	for(let i of result){
		if(id === i.ad_id && password === i.password){
			sucess = true;
			sucess_response={
				status:1,
				token:token
			}
			break;
		}
	}
	if(sucess){
		ctx.response.body = JSON.stringify(sucess_response);
	}else{
		ctx.response.body = JSON.stringify(fail_response);
	}
};

module.exports = {
    'POST /signin': fn_signin
};