DELIMITER //
DROP TRIGGER IF EXISTS add_book_trigger;
CREATE TRIGGER add_book_trigger after INSERT on book
for each row begin
	declare number INT;
	select count(*) into number from book where bookname=new.bookname;
	if number=0 then
		update book_sum_stock set stock=1 where bookname=new.bookname;
		update book_sum_stock set sum=1 where bookname=new.bookname;
	else
		update book_sum_stock set stock=stock+1 where bookname=new.bookname;
		update book_sum_stock set sum=sum+1 where bookname=new.bookname;
	end if;
end;//
DELIMITER ;



DELIMITER //
DROP TRIGGER IF EXISTS borrow_trigger;
CREATE TRIGGER borrow_trigger after INSERT on borrow
for each row begin
	declare bkname varchar(30);
	select bookname into bkname from book where bno = new.book_id;
	update book_sum_stock set stock=stock-1 where bookname=bkname;
end;//
DELIMITER ;

DELIMITER //
DROP TRIGGER IF EXISTS return_trigger;
CREATE TRIGGER return_trigger after delete on borrow
for each row begin
	declare bkname varchar(30);
	select bookname into bkname from book where bno = old.book_id;
	update book_sum_stock set stock=stock+1 where bookname=bkname;
end;//
DELIMITER ;


// Date.prototype.format = function(fmt) {    //日期类型转换
//     var o = { 
//        "M+" : this.getMonth()+1,                 //月份 
//        "d+" : this.getDate(),                    //日 
//        "h+" : this.getHours(),                   //小时 
//        "m+" : this.getMinutes(),                 //分 
//        "s+" : this.getSeconds(),                 //秒 
//        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
//        "S"  : this.getMilliseconds()             //毫秒 
//    }; 
//    if(/(y+)/.test(fmt)) {
//            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
//    }
//     for(var k in o) {
//        if(new RegExp("("+ k +")").test(fmt)){
//             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
//         }
//     }
//    return fmt; 
// }    


