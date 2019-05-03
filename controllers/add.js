const cont_db = require('./connect.js')
const __token__ = "99fe4c836e3a229af9725e24955dfdb779e315e0"

let addcard = async(ctx,next) => {
    const name = ctx.request.body.name; 
    const department = ctx.request.body.department;
    const type = ctx.request.body.type;
    const token = ctx.request.body.token;

    if(token !== __token__){
        const fail_response = {
            status:-1, 
            message:"token is wrong"
        }
        ctx.response.body = JSON.stringify(fail_response);
        return;
    }

    const result = await cont_db(`
    insert into borrow_card (name,department,type)
    values
    ('${name}','${department}','${type}');
    `);
    const sucess_response = {
        status:1, 
        card_id:result.insertId,
        message:"add card sucessfully"
    }
    ctx.response.body = JSON.stringify(sucess_response);
    return;
};

let addbook = async(ctx,next) => {
    const bookname = ctx.request.body.bookname; 
    const type = ctx.request.body.type;
    const publisher = ctx.request.body.publisher;
    const year=ctx.request.body.year;
    const price=ctx.request.body.price;
    const author=ctx.request.body.author;

    const token = ctx.request.body.token;
    
    if(token !== __token__){
        const fail_response = {
            status:-1, 
            message:"token is wrong"
        }
        ctx.response.body = JSON.stringify(fail_response);
        return;
    }
    const result2 = await cont_db(`
    insert ignore into book_sum_stock (bookname)
    values
    ('${bookname}');
    `);

    const result = await cont_db(`
    insert into book (type,bookname,publisher,year,author,price)
    values
    ('${type}','${bookname}','${publisher}','${year}','${author}','${price}');
    `);
    const sucess_response = {
        status:1, 
        book_id:result.insertId,
        message:"add book sucessfully"
    }
    ctx.response.body = JSON.stringify(sucess_response);
    return;
};

let book_borrow = async(ctx,next) => {
    
};


let booK_return = async(ctx,next) => {

};

module.exports = {
    'POST /addcard': addcard,
    'POST /addbook': addbook,
    'POST /borrow': book_borrow,
    'POST /return': booK_return
};