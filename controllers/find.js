const cont_db = require('./connect.js');
const __token__ = "99fe4c836e3a229af9725e24955dfdb779e315e0";

let display = async(ctx,next) => {
    const card_id = ctx.request.body.card_id;
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
    select book_id,type,bookname,publisher,year,author,price 
    from borrow join book 
    on 
    book.bno=borrow.book_id
    AND card_id=${card_id};
    `);
    const sucess_response = {
        status:1, 
        result:result,
    }
    ctx.response.body = JSON.stringify(sucess_response);
    return;
};

let find = async(ctx,next)=>{
    const type = ctx.request.body.type || '';
    const bookname = ctx.request.body.bookname || '';
    const publisher = ctx.request.body.publisher || '';
    const year_min = ctx.request.body.year_min|| 1900;
    const yeasr_max = ctx.request.body.yeasr_max || 2020;
    const price_min = ctx.request.body.price_min|| 0;
    const price_max = ctx.request.body.price_max||999;
    const order = ctx.request.body.order|| 'bookname';
    const token = ctx.request.body.token;

    if(token !== __token__){
        const fail_response = {
            status:-1, 
            message:"token is wrong"
        }
        ctx.response.body = JSON.stringify(fail_response);
        return;
    }
    query = `
    select * from book where
        publisher like '%${publisher}%' 
        and price >= ${price_min} and price <=${price_max} 
        and year >= ${year_min} and year <=${yeasr_max} 
        and bookname like '%${bookname}%' 
        and type like '%${type}%' 
        order by ${order} ASC;
    `;
    // console.log(query);
    const result = await cont_db.easy_query(query);
    const sucess_response = {
        status:1, 
        result:result,
    }
    ctx.response.body = JSON.stringify(sucess_response);
    return;
}

module.exports = {
    'POST /select/display': display,
    'POST /select/find': find,
};