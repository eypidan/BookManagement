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

    const result = await cont_db.easy_query(`
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
    const book=ctx.request.body.book;
    const bookname=[]
    const token = ctx.request.body.token;
    
    if(token !== __token__){
        const fail_response = {
            status:-1, 
            message:"token is wrong"
        }
        ctx.response.body = JSON.stringify(fail_response);
        return;
    }

    book.forEach((n,i)=>{
        bookname.push({bookname:n.bookname});
    })
    const result2 = await cont_db.addmultiple_book(
        'insert ignore into book_sum_stock (bookname) values ?',
        bookname
    );

    const result = await cont_db.addmultiple_book(
        'insert into book (type,bookname,publisher,year,author,price) values ?',
        book
    );
    const sucess_response = {
        status:1, 
        book_id:result.insertId,
        message:"add book sucessfully"
    }
    cont_db.end();
    ctx.response.body = JSON.stringify(sucess_response);
    return;
};

let book_borrow = async(ctx,next) => {
    const card_id=ctx.request.body.card_id;
    const book_id=ctx.request.body.book_id;
    const data_borrow=ctx.request.body.data_borrow;
    const data_return=ctx.request.body.data_return;
    const admin_name=ctx.request.body.admin_name;
    const token = ctx.request.body.token;
    
    if(token !== __token__){
        const fail_response = {
            status:-1, 
            message:"token is wrong"
        }
        ctx.response.body = JSON.stringify(fail_response);
        return;
    }

    const result = await cont_db.easy_query(`
    insert into borrow (card_id,book_id,borrow_day,return_day,passer)
    values
    ('${card_id}','${book_id}','${data_borrow}','${data_return}','${admin_name}');
    `);
    const sucess_response = {
        status:1, 
        message:"borrow book sucessfully"
    }
    ctx.response.body = JSON.stringify(sucess_response);
    return;
};


let booK_return = async(ctx,next) => {
    const card_id=ctx.request.body.card_id;
    const book_id=ctx.request.body.book_id;
    const token = ctx.request.body.token;
    
    if(token !== __token__){
        const fail_response = {
            status:-1, 
            message:"token is wrong"
        }
        ctx.response.body = JSON.stringify(fail_response);
        return;
    }

    const result = await cont_db.easy_query(`
    delete from borrow where card_id='${card_id}' AND book_id='${book_id}';`);
    const sucess_response = {
        status:1, 
        message:"return book sucessfully"
    }
    ctx.response.body = JSON.stringify(sucess_response);
    return;
};

module.exports = {
    'POST /addcard': addcard,
    'POST /addbook': addbook,
    'POST /borrow': book_borrow,
    'POST /return': booK_return
};