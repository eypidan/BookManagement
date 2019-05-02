const cont_db = require('./connect.js')
const __token__ = "99fe4c836e3a229af9725e24955dfdb779e315e0"
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

let addcard = async(ctx,next) => {
    const name = ctx.request.body.name; 
    const userid = ctx.request.body.userid;
    const department = ctx.request.body.department;
    const type = ctx.request.body.type;

    const token = ctx.request.body.token;
    if(token !== __token__){
        const fail_response = {
            status:-1, 
            message:"token is wrong"
        }
        ctx.response.body = JSON.stringify(fail_response);
    }

    const result = await cont_db(`
    insert into borrow_card (name,department,type)
    values
    (${name},${department},${type})
    `);
}

module.exports = {
    'POST /addcard': addcard,
    'POST /addbook': addbook,
    'POST /borrow': book_borrow,
    'POST /return': booK_return
};